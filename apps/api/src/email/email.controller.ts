import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { EmailService } from './email.service';
import { CreateEmailAccountDto, UpdateEmailAccountDto, CreateForwarderDto, CreateAutoresponderDto } from './dto/email.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('email')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('email')
export class EmailController {
  constructor(private emailService: EmailService) {}

  // Email Accounts
  @Get('accounts')
  @ApiOperation({ summary: 'Get all email accounts' })
  async findAllAccounts(@Request() req: any) {
    const accountId = req.user.accounts?.[0]?.id;
    return this.emailService.findAllAccounts(accountId);
  }

  @Get('accounts/:id')
  @ApiOperation({ summary: 'Get email account by ID' })
  async findOneAccount(@Param('id') id: string) {
    return this.emailService.findOneAccount(id);
  }

  @Post('accounts')
  @ApiOperation({ summary: 'Create new email account' })
  async createAccount(@Request() req: any, @Body() dto: CreateEmailAccountDto) {
    const accountId = req.user.accounts?.[0]?.id;
    return this.emailService.createAccount(accountId, dto);
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
    const accountId = req.user.accounts?.[0]?.id;
    return this.emailService.findAllForwarders(accountId);
  }

  @Post('forwarders')
  @ApiOperation({ summary: 'Create new email forwarder' })
  async createForwarder(@Request() req: any, @Body() dto: CreateForwarderDto) {
    const accountId = req.user.accounts?.[0]?.id;
    return this.emailService.createForwarder(accountId, dto);
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
    const accountId = req.user.accounts?.[0]?.id;
    return this.emailService.findAllAutoresponders(accountId);
  }

  @Post('autoresponders')
  @ApiOperation({ summary: 'Create new autoresponder' })
  async createAutoresponder(@Request() req: any, @Body() dto: CreateAutoresponderDto) {
    const accountId = req.user.accounts?.[0]?.id;
    return this.emailService.createAutoresponder(accountId, dto);
  }

  @Delete('autoresponders/:id')
  @ApiOperation({ summary: 'Delete autoresponder' })
  async deleteAutoresponder(@Param('id') id: string) {
    return this.emailService.deleteAutoresponder(id);
  }
}
