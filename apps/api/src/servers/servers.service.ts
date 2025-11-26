import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateServerDto, UpdateServerDto, CreateIpAddressDto, UpdateIpAddressDto } from './dto/server.dto';

@Injectable()
export class ServersService {
  constructor(private prisma: PrismaService) {}

  // Server Management
  async createServer(createServerDto: CreateServerDto, adminId: string) {
    return await this.prisma.server.create({
      data: {
        ...createServerDto,
        adminId,
      },
    });
  }

  async findAllServers(adminId: string) {
    return await this.prisma.server.findMany({
      where: { adminId },
      include: {
        _count: {
          select: {
            customers: true,
            ipAddresses: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneServer(id: string, adminId: string) {
    const server = await this.prisma.server.findFirst({
      where: { id, adminId },
      include: {
        customers: {
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
            status: true,
          },
        },
        ipAddresses: true,
      },
    });

    if (!server) {
      throw new HttpException('Server not found', HttpStatus.NOT_FOUND);
    }

    return server;
  }

  async updateServer(id: string, updateServerDto: UpdateServerDto, adminId: string) {
    const server = await this.findOneServer(id, adminId);

    return await this.prisma.server.update({
      where: { id: server.id },
      data: updateServerDto,
    });
  }

  async deleteServer(id: string, adminId: string) {
    const server = await this.findOneServer(id, adminId);

    // Check if server has customers
    const customersCount = await this.prisma.customer.count({
      where: { serverId: id },
    });

    if (customersCount > 0) {
      throw new HttpException(
        'Cannot delete server with active customers',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.server.delete({
      where: { id: server.id },
    });
  }

  // IP Address Management
  async createIpAddress(createIpDto: CreateIpAddressDto, adminId: string) {
    // Verify server belongs to admin
    const server = await this.prisma.server.findFirst({
      where: {
        id: createIpDto.serverId,
        adminId,
      },
    });

    if (!server) {
      throw new HttpException('Server not found', HttpStatus.NOT_FOUND);
    }

    // Check if IP already exists
    const existingIp = await this.prisma.ipAddress.findUnique({
      where: { ipAddress: createIpDto.ipAddress },
    });

    if (existingIp) {
      throw new HttpException('IP address already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.ipAddress.create({
      data: createIpDto,
    });
  }

  async findAllIpAddresses(adminId: string, serverId?: string) {
    const where: any = {
      server: { adminId },
    };

    if (serverId) {
      where.serverId = serverId;
    }

    return await this.prisma.ipAddress.findMany({
      where,
      include: {
        server: {
          select: {
            id: true,
            name: true,
            hostname: true,
          },
        },
        customer: {
          select: {
            id: true,
            username: true,
            fullName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneIpAddress(id: string, adminId: string) {
    const ipAddress = await this.prisma.ipAddress.findFirst({
      where: {
        id,
        server: { adminId },
      },
      include: {
        server: true,
        customer: true,
      },
    });

    if (!ipAddress) {
      throw new HttpException('IP address not found', HttpStatus.NOT_FOUND);
    }

    return ipAddress;
  }

  async updateIpAddress(id: string, updateIpDto: UpdateIpAddressDto, adminId: string) {
    await this.findOneIpAddress(id, adminId);

    return await this.prisma.ipAddress.update({
      where: { id },
      data: updateIpDto,
    });
  }

  async deleteIpAddress(id: string, adminId: string) {
    const ipAddress = await this.findOneIpAddress(id, adminId);

    if (ipAddress.customerId) {
      throw new HttpException(
        'Cannot delete IP address assigned to a customer',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.prisma.ipAddress.delete({
      where: { id },
    });
  }

  async getAvailableIps(adminId: string, serverId?: string) {
    const where: any = {
      server: { adminId },
      customerId: null,
      isActive: true,
    };

    if (serverId) {
      where.serverId = serverId;
    }

    return await this.prisma.ipAddress.findMany({
      where,
      include: {
        server: {
          select: {
            id: true,
            name: true,
            hostname: true,
          },
        },
      },
    });
  }
}
