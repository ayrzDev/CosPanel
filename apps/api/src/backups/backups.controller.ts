import { Controller, Get, Post, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BackupsService } from './backups.service';
import { CreateBackupDto, RestoreBackupDto } from './dto/backup.dto';

@ApiTags('backups')
@ApiBearerAuth()
@Controller('backups')
export class BackupsController {
  constructor(private backupsService: BackupsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all backups' })
  async findAll(@Query('accountId') accountId?: string) {
    return this.backupsService.findAll(accountId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get backup storage statistics' })
  async getStorageStats() {
    return this.backupsService.getStorageStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get backup by ID' })
  async findOne(@Param('id') id: string) {
    return this.backupsService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new backup' })
  async create(@Body() dto: CreateBackupDto) {
    return this.backupsService.create(dto);
  }

  @Post('restore')
  @ApiOperation({ summary: 'Restore from backup' })
  async restore(@Body() dto: RestoreBackupDto) {
    return this.backupsService.restore(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete backup' })
  async delete(@Param('id') id: string) {
    return this.backupsService.delete(id);
  }
}
