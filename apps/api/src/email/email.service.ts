import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateEmailAccountDto, UpdateEmailAccountDto, CreateForwarderDto, CreateAutoresponderDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}

  // Email Accounts
  async findAllAccounts(accountId: string) {
    return this.prisma.emailAccount.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneAccount(id: string) {
    const account = await this.prisma.emailAccount.findUnique({
      where: { id },
    });
    
    if (!account) {
      throw new NotFoundException(`Email account with ID ${id} not found`);
    }
    
    return account;
  }

  async createAccount(accountId: string, dto: CreateEmailAccountDto) {
    const existing = await this.prisma.emailAccount.findUnique({
      where: { email: dto.email },
    });
    
    if (existing) {
      throw new ConflictException(`Email account ${dto.email} already exists`);
    }

    return this.prisma.emailAccount.create({
      data: {
        accountId,
        email: dto.email,
        password: dto.password,
        quota: dto.quota || 250,
        usedSpace: 0,
      },
    });
  }

  async updateAccount(id: string, dto: UpdateEmailAccountDto) {
    await this.findOneAccount(id); // Check if exists
    
    return this.prisma.emailAccount.update({
      where: { id },
      data: {
        password: dto.password,
        quota: dto.quota,
      },
    });
  }

  async deleteAccount(id: string) {
    await this.findOneAccount(id); // Check if exists
    
    await this.prisma.emailAccount.delete({
      where: { id },
    });
    
    return { message: 'Email account deleted successfully' };
  }

  // Forwarders
  async findAllForwarders(accountId: string) {
    return this.prisma.emailForwarder.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createForwarder(accountId: string, dto: CreateForwarderDto) {
    return this.prisma.emailForwarder.create({
      data: {
        accountId,
        source: dto.source,
        destination: dto.destination,
      },
    });
  }

  async deleteForwarder(id: string) {
    const forwarder = await this.prisma.emailForwarder.findUnique({
      where: { id },
    });
    
    if (!forwarder) {
      throw new NotFoundException(`Forwarder with ID ${id} not found`);
    }

    await this.prisma.emailForwarder.delete({
      where: { id },
    });
    
    return { message: 'Forwarder deleted successfully' };
  }

  // Autoresponders
  async findAllAutoresponders(accountId: string) {
    return this.prisma.emailAutoresponder.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createAutoresponder(accountId: string, dto: CreateAutoresponderDto) {
    return this.prisma.emailAutoresponder.create({
      data: {
        accountId,
        email: dto.email,
        subject: dto.subject,
        body: dto.body,
        startDate: dto.startDate ? new Date(dto.startDate) : null,
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        isActive: true,
      },
    });
  }

  async deleteAutoresponder(id: string) {
    const autoresponder = await this.prisma.emailAutoresponder.findUnique({
      where: { id },
    });
    
    if (!autoresponder) {
      throw new NotFoundException(`Autoresponder with ID ${id} not found`);
    }

    await this.prisma.emailAutoresponder.delete({
      where: { id },
    });
    
    return { message: 'Autoresponder deleted successfully' };
  }
}
