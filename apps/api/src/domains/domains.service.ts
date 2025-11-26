import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateDomainDto, UpdateSSLDto } from './dto/domain.dto';

@Injectable()
export class DomainsService {
  constructor(private prisma: PrismaService) {}

  async findAll(accountId?: string, customerId?: string) {
    const where: any = {};
    if (accountId) where.accountId = accountId;
    if (customerId) where.customerId = customerId;

    return this.prisma.domain.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      include: {
        customer: {
          select: {
            id: true,
            username: true,
            fullName: true,
            email: true,
          }
        },
        subdomains: true,
        parentDomain: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCustomerStats(customerId: string) {
    const domains = await this.prisma.domain.findMany({
      where: { customerId },
    });

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
      include: {
        hostingPlan: {
          select: {
            addonDomains: true,
            subdomains: true,
            parkedDomains: true,
          }
        }
      }
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }

    const stats = {
      primaryDomains: domains.filter(d => d.domainType === 'PRIMARY').length,
      addonDomains: domains.filter(d => d.domainType === 'ADDON').length,
      subdomains: domains.filter(d => d.domainType === 'SUBDOMAIN').length,
      parkedDomains: domains.filter(d => d.domainType === 'PARKED').length,
      totalDomains: domains.length,
      sslEnabled: domains.filter(d => d.sslStatus === 'ACTIVE').length,
      limits: {
        addonDomains: customer.hostingPlan.addonDomains,
        subdomains: customer.hostingPlan.subdomains,
        parkedDomains: customer.hostingPlan.parkedDomains,
      },
    };

    return stats;
  }

  async findOne(id: string) {
    const domain = await this.prisma.domain.findUnique({
      where: { id },
    });

    if (!domain) {
      throw new NotFoundException(`Domain with ID ${id} not found`);
    }

    return domain;
  }

  async create(dto: CreateDomainDto) {
    const existing = await this.prisma.domain.findUnique({
      where: { fqdn: dto.fqdn },
    });

    if (existing) {
      throw new ConflictException(`Domain ${dto.fqdn} already exists`);
    }

    // Check if customer ID is provided and validate limits
    if (dto.customerId) {
      const customer = await this.prisma.customer.findUnique({
        where: { id: dto.customerId },
        include: { hostingPlan: true }
      });

      if (!customer) {
        throw new NotFoundException('Customer not found');
      }

      const stats = await this.getCustomerStats(dto.customerId);
      const domainType = dto.domainType || 'ADDON';

      // Check limits based on domain type
      if (domainType === 'ADDON' && stats.addonDomains >= stats.limits.addonDomains) {
        throw new ConflictException(`Addon domain limit reached (${stats.limits.addonDomains})`);
      }
      if (domainType === 'SUBDOMAIN' && stats.subdomains >= stats.limits.subdomains) {
        throw new ConflictException(`Subdomain limit reached (${stats.limits.subdomains})`);
      }
      if (domainType === 'PARKED' && stats.parkedDomains >= stats.limits.parkedDomains) {
        throw new ConflictException(`Parked domain limit reached (${stats.limits.parkedDomains})`);
      }
    }

    return this.prisma.domain.create({
      data: {
        fqdn: dto.fqdn,
        accountId: dto.accountId,
        customerId: dto.customerId || null,
        domainType: dto.domainType as any || null,
        isPrimary: dto.isPrimary || false,
        parentDomainId: dto.parentDomainId || null,
        documentRoot: dto.documentRoot || null,
      },
      include: {
        customer: true,
        parentDomain: true,
      }
    });
  }

  async updateSSL(id: string, dto: UpdateSSLDto) {
    await this.findOne(id); // Check exists

    return this.prisma.domain.update({
      where: { id },
      data: { sslStatus: dto.sslStatus as any },
    });
  }

  async delete(id: string) {
    await this.findOne(id); // Check exists

    await this.prisma.domain.delete({
      where: { id },
    });

    return { message: 'Domain deleted successfully' };
  }
}
