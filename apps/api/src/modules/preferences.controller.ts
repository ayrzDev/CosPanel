import { Controller, Get, Put, Body, UseGuards, Req, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PreferencesService } from './preferences.service';

@ApiTags('preferences')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('preferences')
export class PreferencesController {
  constructor(private preferencesService: PreferencesService) {}

  @Get()
  @ApiOperation({ summary: 'Get user preferences' })
  async getPreferences(@Req() req) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.preferencesService.getPreferences(accountId);
  }

  @Put()
  @ApiOperation({ summary: 'Update user preferences' })
  async updatePreferences(@Req() req, @Body() dto: any) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.preferencesService.updatePreferences(accountId, dto);
  }

  @Put('password')
  @ApiOperation({ summary: 'Update password' })
  async updatePassword(@Req() req, @Body() dto: { currentPassword: string; newPassword: string }) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.preferencesService.updatePassword(accountId, dto);
  }

  @Put('contact')
  @ApiOperation({ summary: 'Update contact information' })
  async updateContactInfo(@Req() req, @Body() dto: { contactEmail?: string; contactPhone?: string }) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.preferencesService.updateContactInfo(accountId, dto);
  }
}
