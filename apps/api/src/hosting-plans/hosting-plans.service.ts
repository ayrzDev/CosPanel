import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateHostingPlanDto, UpdateHostingPlanDto } from './dto/hosting-plan.dto';

@Injectable()
export class HostingPlansService {
  constructor(private prisma: PrismaService) {}

  async create(createHostingPlanDto: CreateHostingPlanDto) {
    return await this.prisma.hostingPlan.create({
      data: {
        name: createHostingPlanDto.name,
        description: createHostingPlanDto.description,
        diskSpaceMB: createHostingPlanDto.diskSpaceMB,
        bandwidthMB: createHostingPlanDto.bandwidthMB,
        emailAccounts: createHostingPlanDto.emailAccounts,
        databases: createHostingPlanDto.databases,
        ftpAccounts: createHostingPlanDto.ftpAccounts,
        subdomains: createHostingPlanDto.subdomains,
        addonDomains: createHostingPlanDto.addonDomains,
        parkedDomains: createHostingPlanDto.parkedDomains,
        monthlyPrice: createHostingPlanDto.monthlyPrice,
        yearlyPrice: createHostingPlanDto.yearlyPrice,
        features: createHostingPlanDto.features || [],
      },
    });
  }

  async findAll() {
    return await this.prisma.hostingPlan.findMany({
      include: {
        _count: {
          select: {
            customers: true,
          },
        },
      },
      orderBy: { monthlyPrice: 'asc' },
    });
  }

  async findOne(id: string) {
    return await this.prisma.hostingPlan.findUnique({
      where: { id },
      include: {
        customers: {
          select: {
            id: true,
            username: true,
            email: true,
            status: true,
          },
        },
      },
    });
  }

  async update(id: string, updateHostingPlanDto: UpdateHostingPlanDto) {
    const plan = await this.findOne(id);
    if (!plan) {
      throw new HttpException('Hosting plan not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.hostingPlan.update({
      where: { id },
      data: updateHostingPlanDto,
    });
  }

  async remove(id: string) {
    const plan = await this.findOne(id);
    if (!plan) {
      throw new HttpException('Hosting plan not found', HttpStatus.NOT_FOUND);
    }

    // Check if plan has active customers
    const customersCount = await this.prisma.customer.count({
      where: { hostingPlanId: id },
    });

    if (customersCount > 0) {
      throw new HttpException(
        'Cannot delete hosting plan with active customers',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.hostingPlan.delete({
      where: { id },
    });

    return { message: 'Hosting plan deleted successfully' };
  }
}
