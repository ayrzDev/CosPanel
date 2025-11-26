import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { InstallSSLDto, GenerateCSRDto, BlockIPDto, CreateFirewallRuleDto } from './dto/security.dto';

@Injectable()
export class SecurityService {
  constructor(private prisma: PrismaService) {}

  // SSL Certificates
  async findAllSSL(domainId?: string) {
    return this.prisma.sSLCertificate.findMany({
      where: domainId ? { domainId } : undefined,
      include: { domain: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async installSSL(dto: InstallSSLDto) {
    return this.prisma.sSLCertificate.create({
      data: {
        domainId: dto.domainId,
        type: (dto.type || 'LETS_ENCRYPT') as any, // Cast to Prisma enum
        certificate: dto.certificate,
        privateKey: dto.privateKey,
        chain: dto.chain,
        validFrom: new Date(),
        validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        autoRenew: dto.autoRenew !== false,
      },
    });
  }

  async generateCSR(dto: GenerateCSRDto) {
    // Generate CSR logic here (crypto module)
    return {
      csr: 'Generated CSR content',
      privateKey: 'Generated private key',
    };
  }

  async deleteSSL(id: string) {
    const ssl = await this.prisma.sSLCertificate.findUnique({
      where: { id },
    });
    
    if (!ssl) {
      throw new NotFoundException(`SSL certificate with ID ${id} not found`);
    }

    await this.prisma.sSLCertificate.delete({
      where: { id },
    });
    
    return { message: 'SSL certificate deleted successfully' };
  }

  // Blocked IPs
  async findAllBlockedIPs(accountId: string) {
    return this.prisma.blockedIP.findMany({
      where: { accountId, isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async blockIP(accountId: string, dto: BlockIPDto) {
    return this.prisma.blockedIP.create({
      data: {
        accountId,
        ipAddress: dto.ipAddress,
        reason: dto.reason,
        expiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
        isActive: true,
      },
    });
  }

  async unblockIP(id: string) {
    const blockedIP = await this.prisma.blockedIP.findUnique({
      where: { id },
    });
    
    if (!blockedIP) {
      throw new NotFoundException(`Blocked IP with ID ${id} not found`);
    }

    await this.prisma.blockedIP.update({
      where: { id },
      data: { isActive: false },
    });
    
    return { message: 'IP unblocked successfully' };
  }

  // Firewall Rules
  async findAllFirewallRules(accountId: string) {
    return this.prisma.firewallRule.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createFirewallRule(accountId: string, dto: CreateFirewallRuleDto) {
    return this.prisma.firewallRule.create({
      data: {
        accountId,
        name: dto.name,
        port: dto.port,
        protocol: dto.protocol || 'TCP',
        source: dto.source,
        action: dto.action || 'ALLOW',
        isActive: true,
      },
    });
  }

  async toggleFirewallRule(id: string) {
    const rule = await this.prisma.firewallRule.findUnique({
      where: { id },
    });
    
    if (!rule) {
      throw new NotFoundException(`Firewall rule with ID ${id} not found`);
    }

    return this.prisma.firewallRule.update({
      where: { id },
      data: { isActive: !rule.isActive },
    });
  }

  async deleteFirewallRule(id: string) {
    const rule = await this.prisma.firewallRule.findUnique({
      where: { id },
    });
    
    if (!rule) {
      throw new NotFoundException(`Firewall rule with ID ${id} not found`);
    }

    await this.prisma.firewallRule.delete({
      where: { id },
    });
    
    return { message: 'Firewall rule deleted successfully' };
  }
}
