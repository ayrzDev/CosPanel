import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request as Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SoftwareService } from './software.service';

@ApiTags('software')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('software')
export class SoftwareController {
  constructor(private softwareService: SoftwareService) {}

  @Get('php/versions')
  @ApiOperation({ summary: 'Get PHP versions' })
  async getPHPVersions(@Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.softwareService.getPHPVersions(accountId);
  }

  @Post('php/versions')
  @ApiOperation({ summary: 'Set PHP version for path' })
  async setPHPVersion(@Req() req: Request, @Body() dto: { path: string; version: string }) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.softwareService.setPHPVersion(accountId, dto);
  }

  @Delete('php/versions/:id')
  @ApiOperation({ summary: 'Delete PHP version configuration' })
  async deletePHPVersion(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.softwareService.deletePHPVersion(id, accountId);
  }

  @Get('apps')
  @ApiOperation({ summary: 'Get installed applications' })
  async getInstalledApps(@Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.softwareService.getInstalledApps(accountId);
  }

  @Post('apps')
  @ApiOperation({ summary: 'Install application' })
  async installApp(@Req() req: Request, @Body() dto: any) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.softwareService.installApp(accountId, dto);
  }

  @Put('apps/:id')
  @ApiOperation({ summary: 'Update application' })
  async updateApp(@Param('id') id: string, @Req() req: Request, @Body() dto: { version: string }) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.softwareService.updateApp(id, accountId, dto);
  }

  @Delete('apps/:id')
  @ApiOperation({ summary: 'Uninstall application' })
  async uninstallApp(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.softwareService.uninstallApp(id, accountId);
  }
}
