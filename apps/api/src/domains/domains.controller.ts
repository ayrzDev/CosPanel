import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DomainsService } from './domains.service';
import { CreateDomainDto, UpdateSSLDto } from './dto/domain.dto';

@ApiTags('domains')
@ApiBearerAuth()
@Controller('domains')
export class DomainsController {
  constructor(private domainsService: DomainsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all domains' })
  async findAll(
    @Query('accountId') accountId?: string,
    @Query('customerId') customerId?: string
  ) {
    return this.domainsService.findAll(accountId, customerId);
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
  async create(@Body() dto: CreateDomainDto) {
    return this.domainsService.create(dto);
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
