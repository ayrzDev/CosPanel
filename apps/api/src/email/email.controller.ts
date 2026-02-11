import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { CreateEmailAccountDto, UpdateEmailAccountDto, CreateForwarderDto, UpdateForwarderDto, CreateAutoresponderDto, CreateMailingListDto, AddMailingListMemberDto, CreateDomainAliasDto, UpdateBoxTrapperDto, DefaultAddressDto, CreateEmailFilterDto, UpdateSpamFilterDto } from './dto/email.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('email')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  private getAccountOrCustomerId(req: any): { accountId?: string; customerId?: string } {
    const accountId = req.user?.accounts?.[0]?.id;

    // debug: log user object shape to help diagnose missing account issues
    try {
      // eslint-disable-next-line no-console
      console.log('[getAccountOrCustomerId] req.user ->', JSON.stringify(req.user));
    } catch (e) {
      // ignore
    }

    // If user is a customer, always return customerId
    if (req.user?.type === 'customer') {
      return {
        accountId: accountId || undefined,
        customerId: req.user.id,
      };
    }

    // Also accept explicit accountId on the user object (token may include it)
    if (req.user?.accountId) {
      return { accountId: req.user.accountId };
    }

    // Return whatever we have (may be undefined); callers decide how to handle missing accountId
    return { accountId };
  }

  // Email Accounts
  @Get('accounts')
  @ApiOperation({ summary: 'Get all email accounts' })
  async findAllAccounts(@Request() req: any) {
    // For customers, always use customerId
    if (req.user?.type === 'customer') {
      return this.emailService.findAllAccountsByCustomer(req.user.id);
    }
    
    // For admin/root users, show all email accounts
    if (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN') {
      return this.emailService.findAllAccountsAdmin();
    }
    
    const ids = this.getAccountOrCustomerId(req);
    return this.emailService.findAllAccounts(ids.accountId!);
  }

  @Get('accounts/:id')
  @ApiOperation({ summary: 'Get email account by ID' })
  async findOneAccount(@Param('id') id: string) {
    return this.emailService.findOneAccount(id);
  }

  @Post('accounts')
  @ApiOperation({ summary: 'Create new email account' })
  async createAccount(@Request() req: any, @Body() dto: CreateEmailAccountDto) {
    // For customers, always use customerId
    if (req.user?.type === 'customer') {
      return this.emailService.createAccountForCustomer(req.user.id, dto);
    }
    
    // For admin/root users, allow creating without account restriction
    if (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN') {
      return this.emailService.createAccountAdmin(dto);
    }
    
    const ids = this.getAccountOrCustomerId(req);
    return this.emailService.createAccount(ids.accountId!, dto);
  }

  @Put('accounts/:id')
  @ApiOperation({ summary: 'Update email account' })
  async updateAccount(@Param('id') id: string, @Body() dto: UpdateEmailAccountDto) {
    return this.emailService.updateAccount(id, dto);
  }

  @Delete('accounts/:id')
  @ApiOperation({ summary: 'Delete email account' })
  async deleteAccount(@Param('id') id: string) {
    return this.emailService.deleteAccount(id);
  }

  // Forwarders
  @Get('forwarders')
  @ApiOperation({ summary: 'Get all email forwarders' })
  async findAllForwarders(@Request() req: any) {
    if (req.user?.type === 'customer') {
      return this.emailService.findAllForwardersByCustomer(req.user.id);
    }
    if (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN') {
      return this.emailService.findAllForwardersAdmin();
    }
    const ids = this.getAccountOrCustomerId(req);
    return this.emailService.findAllForwarders(ids.accountId!);
  }

  @Post('forwarders')
  @ApiOperation({ summary: 'Create new email forwarder' })
  async createForwarder(@Request() req: any, @Body() dto: CreateForwarderDto) {
    if (req.user?.type === 'customer') {
      return this.emailService.createForwarderForCustomer(req.user.id, dto);
    }
    if (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN') {
      return this.emailService.createForwarderAdmin(dto);
    }
    const ids = this.getAccountOrCustomerId(req);
    return this.emailService.createForwarder(ids.accountId!, dto);
  }

  @Put('forwarders/:id')
  @ApiOperation({ summary: 'Update email forwarder' })
  async updateForwarder(@Param('id') id: string, @Body() dto: UpdateForwarderDto) {
    return this.emailService.updateForwarder(id, dto);
  }

  @Delete('forwarders/:id')
  @ApiOperation({ summary: 'Delete email forwarder' })
  async deleteForwarder(@Param('id') id: string) {
    return this.emailService.deleteForwarder(id);
  }

  // Autoresponders
  @Get('autoresponders')
  @ApiOperation({ summary: 'Get all autoresponders' })
  async findAllAutoresponders(@Request() req: any) {
    if (req.user?.type === 'customer') {
      return this.emailService.findAllAutorespondersByCustomer(req.user.id);
    }
    const ids = this.getAccountOrCustomerId(req);
    return this.emailService.findAllAutoresponders(ids.accountId!);
  }

  @Post('autoresponders')
  @ApiOperation({ summary: 'Create new autoresponder' })
  async createAutoresponder(@Request() req: any, @Body() dto: CreateAutoresponderDto) {
    if (req.user?.type === 'customer') {
      return this.emailService.createAutoresponderForCustomer(req.user.id, dto);
    }
    const ids = this.getAccountOrCustomerId(req);
    return this.emailService.createAutoresponder(ids.accountId!, dto);
  }

  @Delete('autoresponders/:id')
  @ApiOperation({ summary: 'Delete autoresponder' })
  async deleteAutoresponder(@Param('id') id: string) {
    return this.emailService.deleteAutoresponder(id);
  }

  // Mailing Lists
  @Get('mailing-lists')
  @ApiOperation({ summary: 'Get mailing lists' })
  async findAllMailingLists(@Request() req: any) {
    if (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN') return this.emailService.findAllMailingListsAdmin();
    const accountId = req.user?.accounts?.[0]?.id;
    return this.emailService.findAllMailingLists(accountId);
  }

  @Post('mailing-lists')
  @ApiOperation({ summary: 'Create mailing list' })
  async createMailingList(@Request() req: any, @Body() dto: CreateMailingListDto) {
    const accountId = req.user?.accounts?.[0]?.id;
    return this.emailService.createMailingList(accountId, dto);
  }

  @Post('mailing-lists/:id/members')
  @ApiOperation({ summary: 'Add member to mailing list' })
  async addMailingListMember(@Param('id') id: string, @Body() dto: AddMailingListMemberDto) {
    return this.emailService.addMailingListMember(id, dto);
  }

  @Get('mailing-lists/:id')
  @ApiOperation({ summary: 'Get mailing list by ID' })
  async findOneMailingList(@Param('id') id: string) {
    return this.emailService.findOneMailingList(id);
  }

  @Delete('mailing-lists/:id')
  @ApiOperation({ summary: 'Delete mailing list' })
  async deleteMailingList(@Param('id') id: string) {
    return this.emailService.deleteMailingList(id);
  }

  @Delete('mailing-lists/members/:id')
  @ApiOperation({ summary: 'Remove mailing list member' })
  async removeMailingListMember(@Param('id') id: string) {
    return this.emailService.removeMailingListMember(id);
  }

  // Domain Aliases
  @Get('aliases')
  @ApiOperation({ summary: 'Get aliases for domain' })
  async findAllAliases(@Query('domainId') domainId: string) {
    return this.emailService.findAllAliases(domainId);
  }

  @Post('aliases')
  @ApiOperation({ summary: 'Create domain alias' })
  async createAlias(@Query('domainId') domainId: string, @Body() dto: CreateDomainAliasDto) {
    return this.emailService.createAlias(domainId, dto);
  }

  @Delete('aliases/:id')
  @ApiOperation({ summary: 'Delete alias' })
  async deleteAlias(@Param('id') id: string) {
    return this.emailService.deleteAlias(id);
  }

  // BoxTrapper
  @Get('boxtrapper')
  @ApiOperation({ summary: 'Get BoxTrapper config for account' })
  async getBoxTrapper(@Request() req: any) {
    const accountId = req.user?.accounts?.[0]?.id;
    return this.emailService.getBoxTrapper(accountId);
  }

  @Put('boxtrapper')
  @ApiOperation({ summary: 'Update BoxTrapper config' })
  async updateBoxTrapper(@Request() req: any, @Body() dto: UpdateBoxTrapperDto) {
    const accountId = req.user?.accounts?.[0]?.id;
    return this.emailService.updateBoxTrapper(accountId, dto as any);
  }

  // Default Address
  @Get('default')
  @ApiOperation({ summary: 'Get default address config' })
  async getDefault(@Request() req: any) {
    const accountId = req.user?.accounts?.[0]?.id;
    if (req.user?.type === 'customer') {
      return this.emailService.getDefaultAddress(undefined, req.user.id);
    }
    return this.emailService.getDefaultAddress(accountId);
  }

  @Put('default')
  @ApiOperation({ summary: 'Set default address config' })
  async setDefault(@Request() req: any, @Body() dto: DefaultAddressDto) {
    const accountId = req.user?.accounts?.[0]?.id;
    if (req.user?.type === 'customer') {
      return this.emailService.setDefaultAddress(undefined, dto, req.user.id);
    }
    return this.emailService.setDefaultAddress(accountId, dto);
  }

  // Filters
  @Get('filters')
  @ApiOperation({ summary: 'Get all email filters' })
  async getFilters(@Request() req: any) {
    const ids = this.getAccountOrCustomerId(req);
    let { accountId, customerId } = ids;
    if (!accountId && (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN')) {
      accountId = await this.emailService.getOrCreateDefaultAdminAccount();
    }
    return this.emailService.getFilters(accountId, customerId);
  }

  @Post('filters')
  @ApiOperation({ summary: 'Create email filter' })
  async createFilter(@Request() req: any, @Body() dto: CreateEmailFilterDto) {
    const ids = this.getAccountOrCustomerId(req);
    let { accountId, customerId } = ids;
    if (!accountId && (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN')) {
      accountId = await this.emailService.getOrCreateDefaultAdminAccount();
    }
    return this.emailService.createFilter(accountId, dto, customerId);
  }

  @Delete('filters/:id')
  @ApiOperation({ summary: 'Delete email filter' })
  async deleteFilter(@Param('id') id: string, @Request() req: any) {
    const ids = this.getAccountOrCustomerId(req);
    let { accountId, customerId } = ids;
    if (!accountId && (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN')) {
      accountId = await this.emailService.getOrCreateDefaultAdminAccount();
    }
    return this.emailService.deleteFilter(id, accountId, customerId);
  }

  // Spam Filter
  @Get('spam-filter')
  @ApiOperation({ summary: 'Get spam filter settings' })
  async getSpamFilter(@Request() req: any) {
    const ids = this.getAccountOrCustomerId(req);
    let { accountId, customerId } = ids;
    if (!accountId && (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN')) {
      accountId = await this.emailService.getOrCreateDefaultAdminAccount();
    }
    return this.emailService.getSpamFilter(accountId, customerId);
  }

  @Put('spam-filter')
  @ApiOperation({ summary: 'Update spam filter settings' })
  async updateSpamFilter(@Request() req: any, @Body() dto: UpdateSpamFilterDto) {
    const ids = this.getAccountOrCustomerId(req);
    let { accountId, customerId } = ids;
    if (!accountId && (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN')) {
      accountId = await this.emailService.getOrCreateDefaultAdminAccount();
    }
    return this.emailService.updateSpamFilter(accountId, dto, customerId);
  }
}
