import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto, UpdateFileDto, CreateDirectoryDto, SetPermissionsDto, CompressFilesDto } from './dto/file.dto';

export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size: number;
  permissions: string;
  owner: string;
  modified: Date;
}

@Injectable()
export class FilesService {
  private files: FileItem[] = [
    {
      name: 'index.html',
      path: '/public_html/index.html',
      type: 'file',
      size: 2048,
      permissions: '0644',
      owner: 'umixpanel',
      modified: new Date('2024-12-10'),
    },
    {
      name: 'css',
      path: '/public_html/css',
      type: 'directory',
      size: 0,
      permissions: '0755',
      owner: 'umixpanel',
      modified: new Date('2024-12-01'),
    },
    {
      name: 'style.css',
      path: '/public_html/css/style.css',
      type: 'file',
      size: 5120,
      permissions: '0644',
      owner: 'umixpanel',
      modified: new Date('2024-12-05'),
    },
  ];

  async listDirectory(path: string = '/public_html'): Promise<FileItem[]> {
    // Filter files that are direct children of the path
    return this.files.filter(f => {
      const parent = f.path.substring(0, f.path.lastIndexOf('/'));
      return parent === path;
    });
  }

  async getFile(path: string): Promise<FileItem & { content?: string }> {
    const file = this.files.find(f => f.path === path);
    if (!file) {
      throw new NotFoundException(`File not found: ${path}`);
    }

    if (file.type === 'file') {
      return {
        ...file,
        content: '// File content here',
      };
    }

    return file;
  }

  async createFile(dto: CreateFileDto): Promise<FileItem> {
    const newFile: FileItem = {
      name: dto.path.split('/').pop() || 'unnamed',
      path: dto.path,
      type: 'file',
      size: dto.content.length,
      permissions: '0644',
      owner: 'umixpanel',
      modified: new Date(),
    };

    this.files.push(newFile);
    return newFile;
  }

  async updateFile(path: string, dto: UpdateFileDto): Promise<FileItem> {
    const file = this.files.find(f => f.path === path);
    if (!file) {
      throw new NotFoundException(`File not found: ${path}`);
    }

    file.size = dto.content.length;
    file.modified = new Date();

    return file;
  }

  async deleteFile(path: string): Promise<{ message: string }> {
    const index = this.files.findIndex(f => f.path === path);
    if (index === -1) {
      throw new NotFoundException(`File not found: ${path}`);
    }

    this.files.splice(index, 1);
    return { message: 'File deleted successfully' };
  }

  async createDirectory(dto: CreateDirectoryDto): Promise<FileItem> {
    const newDir: FileItem = {
      name: dto.path.split('/').pop() || 'unnamed',
      path: dto.path,
      type: 'directory',
      size: 0,
      permissions: '0755',
      owner: 'umixpanel',
      modified: new Date(),
    };

    this.files.push(newDir);
    return newDir;
  }

  async setPermissions(path: string, dto: SetPermissionsDto): Promise<FileItem> {
    const file = this.files.find(f => f.path === path);
    if (!file) {
      throw new NotFoundException(`File not found: ${path}`);
    }

    file.permissions = dto.permissions;
    return file;
  }

  async compressFiles(dto: CompressFilesDto): Promise<{ message: string; path: string }> {
    return {
      message: `Successfully compressed ${dto.files.length} files`,
      path: dto.destination,
    };
  }

  async extractArchive(path: string, destination: string): Promise<{ message: string }> {
    return {
      message: `Successfully extracted archive to ${destination}`,
    };
  }

  async getDiskUsage(): Promise<{ total: number; used: number; available: number }> {
    return {
      total: 50 * 1024, // 50 GB
      used: 23.5 * 1024, // 23.5 GB
      available: 26.5 * 1024, // 26.5 GB
    };
  }
}
