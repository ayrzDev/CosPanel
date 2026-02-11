import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request as Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdvancedService } from './advanced.service';

@ApiTags('advanced')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('advanced')
export class AdvancedController {
  constructor(private advancedService: AdvancedService) {}

  // Error Pages
  @Get('error-pages')
  @ApiOperation({ summary: 'Get custom error pages' })
  async getErrorPages(@Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.getErrorPages(accountId);
  }

  @Post('error-pages')
  @ApiOperation({ summary: 'Set custom error page' })
  async setErrorPage(@Req() req: Request, @Body() dto: { errorCode: number; content: string }) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.setErrorPage(accountId, dto);
  }

  @Delete('error-pages/:id')
  @ApiOperation({ summary: 'Delete custom error page' })
  async deleteErrorPage(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.deleteErrorPage(id, accountId);
  }

  // MIME Types & Handlers
  @Get('mime-types')
  @ApiOperation({ summary: 'Get MIME types' })
  async getMimeTypes(@Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.getMimeTypes(accountId);
  }

  @Post('mime-types')
  @ApiOperation({ summary: 'Add MIME type' })
  async addMimeType(@Req() req: Request, @Body() dto: { extension: string; mimeType: string; handler?: string }) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.addMimeType(accountId, dto);
  }

  @Put('mime-types/:id')
  @ApiOperation({ summary: 'Update MIME type' })
  async updateMimeType(@Param('id') id: string, @Req() req: Request, @Body() dto: { mimeType?: string; handler?: string }) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.updateMimeType(id, accountId, dto);
  }

  @Delete('mime-types/:id')
  @ApiOperation({ summary: 'Delete MIME type' })
  async deleteMimeType(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.deleteMimeType(id, accountId);
  }

  // Cron Jobs
  @Get('cron')
  @ApiOperation({ summary: 'Get cron jobs' })
  async getCronJobs(@Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.getCronJobs(accountId);
  }

  @Post('cron')
  @ApiOperation({ summary: 'Create cron job' })
  async createCronJob(@Req() req: Request, @Body() dto: any) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.createCronJob(accountId, dto);
  }

  @Put('cron/:id')
  @ApiOperation({ summary: 'Update cron job' })
  async updateCronJob(@Param('id') id: string, @Req() req: Request, @Body() dto: any) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.updateCronJob(id, accountId, dto);
  }

  @Delete('cron/:id')
  @ApiOperation({ summary: 'Delete cron job' })
  async deleteCronJob(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.deleteCronJob(id, accountId);
  }

  // Terminal
  @Get('terminal/sessions')
  @ApiOperation({ summary: 'Get terminal sessions' })
  async getTerminalSessions(@Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.getTerminalSessions(accountId);
  }

  @Post('terminal/sessions')
  @ApiOperation({ summary: 'Create terminal session' })
  async createTerminalSession(@Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.createTerminalSession(accountId);
  }

  @Delete('terminal/sessions/:id')
  @ApiOperation({ summary: 'Close terminal session' })
  async closeTerminalSession(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.advancedService.closeTerminalSession(id, accountId);
  }
}
