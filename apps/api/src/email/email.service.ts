import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateEmailAccountDto, UpdateEmailAccountDto, CreateForwarderDto, UpdateForwarderDto, CreateAutoresponderDto } from './dto/email.dto';

@Injectable()
export class EmailService {
  constructor(private prisma: PrismaService) {}

  // Helper: Get or create account for customer
  private async getOrCreateAccountForCustomer(customerId: string): Promise<string> {
    let account = await this.prisma.account.findFirst({
      where: { customerId },
    });

    if (!account) {
      const adminUser = await this.prisma.user.findFirst({
        where: { role: { in: ['ROOT', 'ADMIN'] } },
        orderBy: { createdAt: 'asc' },
      });

      if (!adminUser) {
        throw new NotFoundException('No admin user found to create account');
      }

      account = await this.prisma.account.create({
        data: {
          ownerId: adminUser.id,
          customerId,
          plan: 'BASIC',
          status: 'active',
        },
      });
    }

    return account.id;
  }

  // Helper: Ensure there is at least one account available for admin/root operations
  async getOrCreateDefaultAdminAccount(): Promise<string> {
    let account = await this.prisma.account.findFirst({
      orderBy: { createdAt: 'asc' },
    });

    if (!account) {
      const adminUser = await this.prisma.user.findFirst({
        where: { role: { in: ['ROOT', 'ADMIN'] } },
        orderBy: { createdAt: 'asc' },
      });

      if (!adminUser) {
        throw new NotFoundException('No admin user found');
      }

      account = await this.prisma.account.create({
        data: {
          ownerId: adminUser.id,
          plan: 'BASIC',
          status: 'active',
        },
      });
    }

    return account.id;
  }

  // Email Accounts
  async findAllAccounts(accountId: string) {
    return this.prisma.emailAccount.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllAccountsByCustomer(customerId: string) {
    const account = await this.prisma.account.findFirst({
      where: { customerId },
    });

    if (!account) {
      return []; // No account yet, return empty list
    }

    return this.prisma.emailAccount.findMany({
      where: { accountId: account.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllAccountsAdmin() {
    // Admin can see all email accounts
    return this.prisma.emailAccount.findMany({
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

  async createAccountForCustomer(customerId: string, dto: CreateEmailAccountDto) {
    const existing = await this.prisma.emailAccount.findUnique({
      where: { email: dto.email },
    });
    
    if (existing) {
      throw new ConflictException(`Email account ${dto.email} already exists`);
    }

    const accountId = await this.getOrCreateAccountForCustomer(customerId);

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

  async createAccountAdmin(dto: CreateEmailAccountDto) {
    const existing = await this.prisma.emailAccount.findUnique({
      where: { email: dto.email },
    });
    
    if (existing) {
      throw new ConflictException(`Email account ${dto.email} already exists`);
    }

    const accountId = await this.getOrCreateDefaultAdminAccount();

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

  async findAllForwardersAdmin() {
    return this.prisma.emailForwarder.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllForwardersByCustomer(customerId: string) {
    const account = await this.prisma.account.findFirst({
      where: { customerId },
    });
    if (!account) return [];
    return this.prisma.emailForwarder.findMany({
      where: { accountId: account.id },
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

  async createForwarderAdmin(dto: CreateForwarderDto) {
    const accountId = await this.getOrCreateDefaultAdminAccount();
    return this.createForwarder(accountId, dto);
  }

  async createForwarderForCustomer(customerId: string, dto: CreateForwarderDto) {
    const accountId = await this.getOrCreateAccountForCustomer(customerId);
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

  async updateForwarder(id: string, dto: UpdateForwarderDto) {
    const forwarder = await this.prisma.emailForwarder.findUnique({
      where: { id },
    });

    if (!forwarder) {
      throw new NotFoundException(`Forwarder with ID ${id} not found`);
    }

    return this.prisma.emailForwarder.update({
      where: { id },
      data: {
        source: dto.source,
        destination: dto.destination,
      },
    });
  }

  // Autoresponders
  async findAllAutoresponders(accountId: string) {
    return this.prisma.emailAutoresponder.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findAllAutorespondersByCustomer(customerId: string) {
    const account = await this.prisma.account.findFirst({
      where: { customerId },
    });
    if (!account) return [];
    return this.prisma.emailAutoresponder.findMany({
      where: { accountId: account.id },
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

  async createAutoresponderForCustomer(customerId: string, dto: CreateAutoresponderDto) {
    const accountId = await this.getOrCreateAccountForCustomer(customerId);
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

  // Mailing Lists
  async findAllMailingLists(accountId: string) {
    return this.prisma.mailingList.findMany({ where: { accountId }, include: { members: true }, orderBy: { createdAt: 'desc' } });
  }

  async findAllMailingListsAdmin() {
    return this.prisma.mailingList.findMany({ include: { members: true }, orderBy: { createdAt: 'desc' } });
  }

  async createMailingList(accountId: string | undefined, dto: any) {
    let acctId = accountId;
    if (!acctId) {
      acctId = await this.getOrCreateDefaultAdminAccount();
    }

    try {
      return await this.prisma.mailingList.create({ data: { accountId: acctId, name: dto.name || dto.email, email: dto.email, description: dto.description || null } });
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
        throw new ConflictException(`Mailing list with email ${dto.email} already exists`);
      }
      throw e;
    }
  }

  async addMailingListMember(listId: string, dto: any) {
    return this.prisma.mailingListMember.create({ data: { mailingListId: listId, email: dto.email } });
  }

  async removeMailingListMember(id: string) {
    const member = await this.prisma.mailingListMember.findUnique({ where: { id } });
    if (!member) throw new NotFoundException(`Mailing list member ${id} not found`);
    await this.prisma.mailingListMember.delete({ where: { id } });
    return { message: 'Member removed' };
  }

  async findOneMailingList(id: string) {
    const list = await this.prisma.mailingList.findUnique({ where: { id }, include: { members: true } });
    if (!list) throw new NotFoundException(`Mailing list ${id} not found`);
    return list;
  }

  async deleteMailingList(id: string) {
    const list = await this.prisma.mailingList.findUnique({ where: { id } });
    if (!list) throw new NotFoundException(`Mailing list ${id} not found`);
    await this.prisma.mailingList.delete({ where: { id } });
    return { message: 'Mailing list deleted' };
  }

  // Domain Aliases
  async findAllAliases(domainId: string) {
    return this.prisma.domainAlias.findMany({ where: { domainId }, orderBy: { createdAt: 'desc' } });
  }

  async createAlias(domainId: string, dto: any) {
    return this.prisma.domainAlias.create({ data: { domainId, alias: dto.alias } });
  }

  async deleteAlias(id: string) {
    const alias = await this.prisma.domainAlias.findUnique({ where: { id } });
    if (!alias) throw new NotFoundException(`Alias ${id} not found`);
    await this.prisma.domainAlias.delete({ where: { id } });
    return { message: 'Alias deleted' };
  }

  // BoxTrapper
  async getBoxTrapper(accountId: string) {
    return this.prisma.boxTrapper.findFirst({ where: { accountId } });
  }

  async updateBoxTrapper(accountId: string, dto: any) {
    const existing = await this.prisma.boxTrapper.findFirst({ where: { accountId } });
    if (existing) {
      return this.prisma.boxTrapper.update({ where: { id: existing.id }, data: { whitelist: dto.whitelist || existing.whitelist, blacklist: dto.blacklist || existing.blacklist, isActive: typeof dto.isActive === 'boolean' ? dto.isActive : existing.isActive, challenge: dto.challenge || existing.challenge } });
    }

    return this.prisma.boxTrapper.create({ data: { accountId, email: dto.email || '', whitelist: dto.whitelist || [], blacklist: dto.blacklist || [], challenge: dto.challenge || null, isActive: !!dto.isActive } });
  }

  // Default Address
  async getDefaultAddress(accountId?: string, customerId?: string) {
    let acctId = accountId;
    if (!acctId && customerId) {
      acctId = (await this.getOrCreateAccountForCustomer(customerId));
    }

    if (!acctId) acctId = await this.getOrCreateDefaultAdminAccount();

    return this.prisma.emailDefault.findFirst({ where: { accountId: acctId } });
  }

  async setDefaultAddress(accountId: string | undefined, dto: any, customerId?: string) {
    let acctId = accountId;
    if (!acctId && customerId) {
      acctId = await this.getOrCreateAccountForCustomer(customerId);
    }
    if (!acctId) acctId = await this.getOrCreateDefaultAdminAccount();

    const existing = await this.prisma.emailDefault.findFirst({ where: { accountId: acctId } });
    if (existing) {
      return this.prisma.emailDefault.update({ where: { id: existing.id }, data: { action: dto.action, forwardTo: dto.forwardTo || null } });
    }

    return this.prisma.emailDefault.create({ data: { accountId: acctId, action: dto.action, forwardTo: dto.forwardTo || null } });
  }

  // Email Filters
  async getFilters(accountId?: string, customerId?: string) {
    let finalAccountId = accountId;
    if (!finalAccountId && customerId) {
      finalAccountId = await this.getOrCreateAccountForCustomer(customerId);
    }
    if (!finalAccountId) {
      throw new BadRequestException('Account or Customer ID required');
    }
    return this.prisma.emailFilter.findMany({
      where: { accountId: finalAccountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createFilter(accountId?: string, data?: any, customerId?: string) {
    let finalAccountId = accountId;
    if (!finalAccountId && customerId) {
      finalAccountId = await this.getOrCreateAccountForCustomer(customerId);
    }
    if (!finalAccountId) {
      throw new BadRequestException('Account or Customer ID required');
    }
    return this.prisma.emailFilter.create({
      data: {
        accountId: finalAccountId,
        name: data.name,
        condition: data.condition,
        action: data.action,
        order: data.order || 0,
        isActive: true,
      },
    });
  }

  async deleteFilter(id: string, accountId?: string, customerId?: string) {
    let finalAccountId = accountId;
    if (!finalAccountId && customerId) {
      finalAccountId = await this.getOrCreateAccountForCustomer(customerId);
    }
    if (!finalAccountId) {
      throw new BadRequestException('Account or Customer ID required');
    }
    const filter = await this.prisma.emailFilter.findFirst({
      where: { id, accountId: finalAccountId },
    });
    if (!filter) {
      throw new NotFoundException('Email filter not found');
    }
    await this.prisma.emailFilter.delete({ where: { id } });
    return { message: 'Email filter deleted' };
  }

  // Spam Filter
  async getSpamFilter(accountId?: string, customerId?: string) {
    let finalAccountId = accountId;
    if (!finalAccountId && customerId) {
      finalAccountId = await this.getOrCreateAccountForCustomer(customerId);
    }
    if (!finalAccountId) {
      throw new BadRequestException('Account or Customer ID required');
    }
    return this.prisma.spamFilter.findFirst({
      where: { accountId: finalAccountId },
    });
  }

  async updateSpamFilter(accountId?: string, data?: any, customerId?: string) {
    let finalAccountId = accountId;
    if (!finalAccountId && customerId) {
      finalAccountId = await this.getOrCreateAccountForCustomer(customerId);
    }
    if (!finalAccountId) {
      throw new BadRequestException('Account or Customer ID required');
    }
    const existing = await this.prisma.spamFilter.findFirst({
      where: { accountId: finalAccountId },
    });

    if (existing) {
      return this.prisma.spamFilter.update({
        where: { id: existing.id },
        data: {
          spamScore: data.spamScore,
          enabled: data.isEnabled,
          whiteList: data.whitelist || [],
          blackList: data.blacklist || [],
        },
      });
    }

    return this.prisma.spamFilter.create({
      data: {
        accountId,
        email: data.email || '@',
        spamScore: data.spamScore || 5,
        enabled: data.isEnabled !== false,
        whiteList: data.whitelist || [],
        blackList: data.blacklist || [],
      },
    });
  }
}
