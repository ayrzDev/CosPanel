import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FilesService } from './files.service';
import { CreateFileDto, UpdateFileDto, CreateDirectoryDto, SetPermissionsDto, CompressFilesDto } from './dto/file.dto';
import { CreateFtpDto, UpdateFtpDto } from './dto/ftp.dto';

@ApiTags('files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  // FTP routes MUST come before :id routes
  @Get('ftp')
  @ApiOperation({ summary: 'List FTP accounts' })
  async listFtpAccounts(@Req() req: Request) {
    let accountId = req.user.accounts?.[0]?.id;
    const customerId = req.user.type === 'customer' ? req.user.id : undefined;
    console.log('[FilesController.listFtpAccounts] user.accounts:', req.user.accounts, 'customerId:', customerId);
    if (!accountId && customerId) {
      accountId = await this.filesService.getOrCreateAccountForCustomer(customerId);
    }
    if (!accountId && (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN')) {
      accountId = await this.filesService.getOrCreateDefaultAdminAccount();
    }
    console.log('[FilesController.listFtpAccounts] final accountId:', accountId);
    return this.filesService.listFtpAccounts(accountId);
  }

  @Post('ftp')
  @ApiOperation({ summary: 'Create FTP account' })
  async createFtpAccount(@Body() dto: CreateFtpDto, @Req() req: Request) {
    let accountId = req.user.accounts?.[0]?.id;
    const customerId = req.user.type === 'customer' ? req.user.id : undefined;
    console.log('[FilesController.createFtpAccount] user.accounts:', req.user.accounts, 'customerId:', customerId);
    if (!accountId && customerId) {
      accountId = await this.filesService.getOrCreateAccountForCustomer(customerId);
    }
    if (!accountId && (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN')) {
      accountId = await this.filesService.getOrCreateDefaultAdminAccount();
    }
    console.log('[FilesController.createFtpAccount] final accountId:', accountId);
    return this.filesService.createFtpAccount(accountId, dto);
  }

  @Put('ftp/:id')
  @ApiOperation({ summary: 'Update FTP account' })
  async updateFtpAccount(@Param('id') id: string, @Body() dto: UpdateFtpDto, @Req() req: Request) {
    let accountId = req.user.accounts?.[0]?.id;
    const customerId = req.user.type === 'customer' ? req.user.id : undefined;
    if (!accountId && customerId) {
      accountId = await this.filesService.getOrCreateAccountForCustomer(customerId);
    }
    if (!accountId && (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN')) {
      accountId = await this.filesService.getOrCreateDefaultAdminAccount();
    }
    return this.filesService.updateFtpAccount(id, accountId, dto);
  }

  @Delete('ftp/:id')
  @ApiOperation({ summary: 'Delete FTP account' })
  async deleteFtpAccount(@Param('id') id: string, @Req() req: Request) {
    let accountId = req.user.accounts?.[0]?.id;
    const customerId = req.user.type === 'customer' ? req.user.id : undefined;
    if (!accountId && customerId) {
      accountId = await this.filesService.getOrCreateAccountForCustomer(customerId);
    }
    if (!accountId && (req.user?.role === 'ROOT' || req.user?.role === 'ADMIN')) {
      accountId = await this.filesService.getOrCreateDefaultAdminAccount();
    }
    return this.filesService.deleteFtpAccount(id, accountId);
  }

  @Get()
  @ApiOperation({ summary: 'List all files' })
  async listFiles(@Req() req: Request, @Query('path') path?: string) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    console.log('[FilesController.listFiles] user:', JSON.stringify(req.user || {}), 'path:', path, 'accountId:', accountId);
    return this.filesService.listFiles(accountId, path);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get file by ID' })
  async getFile(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    console.log('[FilesController.getFile] user:', JSON.stringify(req.user || {}), 'id:', id, 'accountId:', accountId);
    return this.filesService.getFile(id, accountId);
  }

  @Post()
  @ApiOperation({ summary: 'Create new file' })
  async createFile(@Body() dto: CreateFileDto, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.filesService.createFile(accountId, dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update file' })
  async updateFile(@Param('id') id: string, @Body() dto: UpdateFileDto, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.filesService.updateFile(id, accountId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete file' })
  async deleteFile(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    console.log('[FilesController.deleteFile] user:', JSON.stringify(req.user || {}), 'id:', id, 'accountId:', accountId);
    return this.filesService.deleteFile(id, accountId);
  }

  @Get(':id/content')
  @ApiOperation({ summary: 'Get file content' })
  async getFileContent(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.filesService.getFileContent(id, accountId);
  }

  @Get('disk/usage')
  @ApiOperation({ summary: 'Get disk usage statistics' })
  async getDiskUsage(@Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.filesService.getDiskUsage(accountId);
  }

  // Git operations
  @Get('git/repos')
  @ApiOperation({ summary: 'List Git repositories' })
  async listGitRepos(@Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.filesService.listGitRepos(accountId);
  }

  @Post('git/repos')
  @ApiOperation({ summary: 'Create Git repository' })
  async createGitRepo(@Body() dto: any, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.filesService.createGitRepo(accountId, dto);
  }

  @Delete('git/repos/:id')
  @ApiOperation({ summary: 'Delete Git repository' })
  async deleteGitRepo(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.filesService.deleteGitRepo(id, accountId);
  }

  // WebDisk operations
  @Get('webdisk')
  @ApiOperation({ summary: 'List WebDisk accounts' })
  async listWebDisks(@Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.filesService.listWebDisks(accountId);
  }

  @Post('webdisk')
  @ApiOperation({ summary: 'Create WebDisk account' })
  async createWebDisk(@Body() dto: any, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.filesService.createWebDisk(accountId, dto);
  }

  @Delete('webdisk/:id')
  @ApiOperation({ summary: 'Delete WebDisk account' })
  async deleteWebDisk(@Param('id') id: string, @Req() req: Request) {
    const accountId = req.user.type === 'customer' ? req.user.accountId : req.user.id;
    return this.filesService.deleteWebDisk(id, accountId);
  }

  @Get('list')
  @ApiOperation({ summary: 'List directory contents' })
  async listDirectory(@Query('path') path?: string) {
    return this.filesService.listDirectory(path);
  }
}
