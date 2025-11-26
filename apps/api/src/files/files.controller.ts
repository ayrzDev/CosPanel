import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FilesService } from './files.service';
import { CreateFileDto, UpdateFileDto, CreateDirectoryDto, SetPermissionsDto, CompressFilesDto } from './dto/file.dto';

@ApiTags('files')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get('list')
  @ApiOperation({ summary: 'List directory contents' })
  async listDirectory(@Query('path') path?: string) {
    return this.filesService.listDirectory(path);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get file content' })
  async getFile(@Query('path') path: string) {
    return this.filesService.getFile(path);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create new file' })
  async createFile(@Body() dto: CreateFileDto) {
    return this.filesService.createFile(dto);
  }

  @Put('update')
  @ApiOperation({ summary: 'Update file content' })
  async updateFile(@Query('path') path: string, @Body() dto: UpdateFileDto) {
    return this.filesService.updateFile(path, dto);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete file or directory' })
  async deleteFile(@Query('path') path: string) {
    return this.filesService.deleteFile(path);
  }

  @Post('directory')
  @ApiOperation({ summary: 'Create new directory' })
  async createDirectory(@Body() dto: CreateDirectoryDto) {
    return this.filesService.createDirectory(dto);
  }

  @Put('permissions')
  @ApiOperation({ summary: 'Set file/directory permissions' })
  async setPermissions(@Query('path') path: string, @Body() dto: SetPermissionsDto) {
    return this.filesService.setPermissions(path, dto);
  }

  @Post('compress')
  @ApiOperation({ summary: 'Compress files/directories' })
  async compressFiles(@Body() dto: CompressFilesDto) {
    return this.filesService.compressFiles(dto);
  }

  @Post('extract')
  @ApiOperation({ summary: 'Extract archive' })
  async extractArchive(@Query('path') path: string, @Query('destination') destination: string) {
    return this.filesService.extractArchive(path, destination);
  }

  @Get('disk-usage')
  @ApiOperation({ summary: 'Get disk usage statistics' })
  async getDiskUsage() {
    return this.filesService.getDiskUsage();
  }
}
