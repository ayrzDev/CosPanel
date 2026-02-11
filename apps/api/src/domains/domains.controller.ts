import { Controller, Get, Post, Put, Delete, Body, Param, Query, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DomainsService } from './domains.service';
import { CreateDomainDto, UpdateSSLDto } from './dto/domain.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('domains')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('domains')
export class DomainsController {
  constructor(private domainsService: DomainsService) {}

  private getAccountOrCustomerId(req: any, dtoAccountId?: string): { accountId?: string; customerId?: string } {
    // First try to get accountId from DTO or user's accounts
    const accountId = dtoAccountId || req.user?.accounts?.[0]?.id;
    
    // If user is a customer, always return customerId (regardless of account)
    if (req.user?.type === 'customer') {
      return { 
        accountId: accountId || undefined, 
        customerId: req.user.id 
      };
    }
    
    // For non-customer users, accountId is required
    if (!accountId) {
      throw new BadRequestException('No account associated with this user. Please contact support.');
    }
    
    return { accountId };
  }

  @Get()
  @ApiOperation({ summary: 'Get all domains' })
  async findAll(
    @Request() req: any,
    @Query('accountId') accountId?: string,
    @Query('customerId') customerId?: string
  ) {
    // For customers, always use their customerId
    if (req.user?.type === 'customer') {
      return this.domainsService.findAll(undefined, req.user.id);
    }
    
    // For admin/root users, show all domains (or filtered by query params)
    if (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN') {
      return this.domainsService.findAll(accountId, customerId);
    }
    
    // For regular users, use accountId from query or authenticated user
    const ids = this.getAccountOrCustomerId(req, accountId);
    return this.domainsService.findAll(ids.accountId, customerId);
  }

  @Get('customer/:customerId/stats')
  @ApiOperation({ summary: 'Get customer domain statistics' })
  async getCustomerStats(@Param('customerId') customerId: string) {
    return this.domainsService.getCustomerStats(customerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get domain by ID' })
  async findOne(@Param('id') id: string) {
    return this.domainsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new domain' })
  async create(@Request() req: any, @Body() dto: CreateDomainDto) {
    // For admin/root users, allow creating with or without accountId
    if (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN') {
      // Admin can create for any customer if customerId is provided
      if (dto.customerId) {
        return this.domainsService.createForCustomer(dto.customerId, dto);
      }
      // If accountId provided, use it; otherwise create without account restriction
      return this.domainsService.create(dto);
    }
    
    // Get accountId from authenticated user if not provided in DTO, or customerId for customers
    const ids = this.getAccountOrCustomerId(req, dto.accountId);
    
    // For customers without account, we need to create domain with customerId
    if (ids.customerId && !ids.accountId) {
      return this.domainsService.createForCustomer(ids.customerId, dto);
    }
    
    return this.domainsService.create({ ...dto, accountId: ids.accountId });
  }

  @Put(':id/ssl')
  @ApiOperation({ summary: 'Update domain SSL status' })
  async updateSSL(@Param('id') id: string, @Body() dto: UpdateSSLDto) {
    return this.domainsService.updateSSL(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete domain' })
  async delete(@Param('id') id: string) {
    return this.domainsService.delete(id);
  }
}
