import { Controller, Get, Post, Delete, Put, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SecurityService } from './security.service';
import { InstallSSLDto, GenerateCSRDto, BlockIPDto, CreateFirewallRuleDto } from './dto/security.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('security')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('security')
export class SecurityController {
  constructor(private securityService: SecurityService) {}

  // SSL Management
  @Get('ssl')
  @ApiOperation({ summary: 'Get all SSL certificates' })
  async findAllSSL() {
    return this.securityService.findAllSSL();
  }

  @Post('ssl/install')
  @ApiOperation({ summary: 'Install SSL certificate' })
  async installSSL(@Body() dto: InstallSSLDto) {
    return this.securityService.installSSL(dto);
  }

  @Post('ssl/generate-csr')
  @ApiOperation({ summary: 'Generate CSR (Certificate Signing Request)' })
  async generateCSR(@Body() dto: GenerateCSRDto) {
    return this.securityService.generateCSR(dto);
  }

  @Delete('ssl/:id')
  @ApiOperation({ summary: 'Delete SSL certificate' })
  async deleteSSL(@Param('id') id: string) {
    return this.securityService.deleteSSL(id);
  }

  // IP Blocker
  @Get('blocked-ips')
  @ApiOperation({ summary: 'Get all blocked IPs' })
  async findAllBlockedIPs(@Request() req: any) {
    const accountId = req.user.accounts?.[0]?.id;
    return this.securityService.findAllBlockedIPs(accountId);
  }

  @Post('block-ip')
  @ApiOperation({ summary: 'Block an IP address' })
  async blockIP(@Request() req: any, @Body() dto: BlockIPDto) {
    const accountId = req.user.accounts?.[0]?.id;
    return this.securityService.blockIP(accountId, dto);
  }

  @Delete('blocked-ips/:id')
  @ApiOperation({ summary: 'Unblock IP address' })
  async unblockIP(@Param('id') id: string) {
    return this.securityService.unblockIP(id);
  }

  // Firewall (ModSecurity)
  @Get('firewall/rules')
  @ApiOperation({ summary: 'Get all firewall rules' })
  async findAllFirewallRules(@Request() req: any) {
    const accountId = req.user.accounts?.[0]?.id;
    return this.securityService.findAllFirewallRules(accountId);
  }

  @Post('firewall/rules')
  @ApiOperation({ summary: 'Create a new firewall rule' })
  async createFirewallRule(@Request() req: any, @Body() dto: CreateFirewallRuleDto) {
    const accountId = req.user.accounts?.[0]?.id;
    return this.securityService.createFirewallRule(accountId, dto);
  }

  @Put('firewall/rules/:id/toggle')
  @ApiOperation({ summary: 'Toggle firewall rule enabled/disabled' })
  async toggleFirewallRule(@Param('id') id: string) {
    return this.securityService.toggleFirewallRule(id);
  }

  @Delete('firewall/rules/:id')
  @ApiOperation({ summary: 'Delete firewall rule' })
  async deleteFirewallRule(@Param('id') id: string) {
    return this.securityService.deleteFirewallRule(id);
  }

  // Security Scans
  @Get('scans')
  @ApiOperation({ summary: 'Get all security scans' })
  async findAllScans(@Request() req: any) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.accounts?.[0]?.id;
    return this.securityService.findAllScans(accountId);
  }

  @Post('scans/trigger')
  @ApiOperation({ summary: 'Trigger a new security scan' })
  async triggerScan(@Request() req: any, @Body() body: { scanType?: 'VIRUS' | 'MALWARE' | 'VULNERABILITY' }) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.accounts?.[0]?.id;
    return this.securityService.triggerScan(accountId, body.scanType);
  }

  @Put('scans/:id')
  @ApiOperation({ summary: 'Update scan result' })
  async updateScanResult(@Param('id') id: string, @Body() body: any) {
    return this.securityService.updateScanResult(id, body);
  }

  @Delete('scans/:id')
  @ApiOperation({ summary: 'Delete security scan' })
  async deleteScan(@Param('id') id: string) {
    return this.securityService.deleteScan(id);
  }
}
