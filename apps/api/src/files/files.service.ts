import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateFileDto, UpdateFileDto, CreateDirectoryDto, SetPermissionsDto, CompressFilesDto } from './dto/file.dto';
import { CreateFtpDto, UpdateFtpDto } from './dto/ftp.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async listFiles(accountId: string, path?: string) {
    const where: any = { accountId };
    if (path) {
      where.path = { startsWith: path };
    }
    return this.prisma.file.findMany({
      where,
      orderBy: [{ name: 'asc' }],
    });
  }

  async getFile(id: string, accountId: string) {
    const file = await this.prisma.file.findFirst({
      where: { id, accountId },
      include: { images: true },
    });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return file;
  }

  async createFile(accountId: string, dto: CreateFileDto) {
    return this.prisma.file.create({
      data: {
        accountId,
        path: dto.path,
        name: dto.name || 'unnamed',
        size: dto.size || 0,
        mimeType: dto.mimeType,
        isPublic: dto.isPublic || false,
      },
    });
  }

  async updateFile(id: string, accountId: string, dto: UpdateFileDto) {
    const file = await this.prisma.file.findFirst({
      where: { id, accountId },
    });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    return this.prisma.file.update({
      where: { id },
      data: dto,
    });
  }

  async deleteFile(id: string, accountId: string) {
    const file = await this.prisma.file.findFirst({
      where: { id, accountId },
    });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    await this.prisma.file.delete({ where: { id } });
    return { message: 'File deleted' };
  }

  async getFileContent(id: string, accountId: string) {
    const file = await this.prisma.file.findFirst({
      where: { id, accountId },
    });
    if (!file) {
      throw new NotFoundException('File not found');
    }
    // TODO: Implement real file content reading from storage
    return { content: '' };
  }

  async getDiskUsage(accountId: string) {
    const files = await this.prisma.file.findMany({
      where: { accountId },
      select: { size: true },
    });
    const totalSize = files.reduce((sum, f) => sum + f.size, 0);
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
      select: { diskQuota: true },
    });
    return {
      used: totalSize,
      quota: account?.diskQuota || 10737418240, // 10GB default
      percentage: account?.diskQuota ? (totalSize / account.diskQuota) * 100 : 0,
    };
  }

  async listDirectory(path: string = '/public_html'): Promise<any[]> {
    return [];
  }

  // Git repository operations
  async listGitRepos(accountId: string) {
    return this.prisma.gitRepo.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createGitRepo(accountId: string, data: { name: string; url: string; path: string; branch?: string }) {
    return this.prisma.gitRepo.create({
      data: {
        ...data,
        accountId,
      },
    });
  }

  async deleteGitRepo(id: string, accountId: string) {
    const repo = await this.prisma.gitRepo.findFirst({
      where: { id, accountId },
    });
    if (!repo) {
      throw new NotFoundException('Git repository not found');
    }
    await this.prisma.gitRepo.delete({ where: { id } });
    return { message: 'Git repository deleted' };
  }

  // Web Disk operations
  async listWebDisks(accountId: string) {
    return this.prisma.webDisk.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createWebDisk(accountId: string, data: { username: string; password: string; path: string; permissions: string }) {
    return this.prisma.webDisk.create({
      data: {
        ...data,
        accountId,
      },
    });
  }

  async deleteWebDisk(id: string, accountId: string) {
    const webdisk = await this.prisma.webDisk.findFirst({
      where: { id, accountId },
    });
    if (!webdisk) {
      throw new NotFoundException('Web Disk not found');
    }
    await this.prisma.webDisk.delete({ where: { id } });
    return { message: 'Web Disk deleted' };
  }

  // FTP account operations
  async listFtpAccounts(accountId: string) {
    const list = await this.prisma.fTPAccount.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
    console.log('[FilesService.listFtpAccounts] accountId:', accountId, 'count:', list.length);
    return list;
  }

  async createFtpAccount(accountId: string, dto: CreateFtpDto) {
    const quotaValue = dto.quota ? (isNaN(Number(dto.quota)) ? 0 : parseInt(dto.quota as any, 10)) : 0;
    try {
      return await this.prisma.fTPAccount.create({
        data: {
          accountId,
          username: dto.username,
          directory: dto.directory,
          quota: quotaValue,
          password: dto.password || Math.random().toString(36).slice(2, 10),
        },
      });
    } catch (err: any) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
        // Unique constraint failed (likely username)
        throw new ConflictException('FTP username already exists');
      }
      throw err;
    }
  }

  async updateFtpAccount(id: string, accountId: string, dto: UpdateFtpDto) {
    const ftp = await this.prisma.fTPAccount.findFirst({ where: { id, accountId } });
    if (!ftp) throw new NotFoundException('FTP account not found');
    const data: any = { ...dto };
    if (dto.quota !== undefined) {
      data.quota = dto.quota ? (isNaN(Number(dto.quota)) ? 0 : parseInt(dto.quota as any, 10)) : 0;
    }
    return this.prisma.fTPAccount.update({ where: { id }, data });
  }

  async deleteFtpAccount(id: string, accountId: string) {
    const ftp = await this.prisma.fTPAccount.findFirst({ where: { id, accountId } });
    if (!ftp) throw new NotFoundException('FTP account not found');
    await this.prisma.fTPAccount.delete({ where: { id } });
    return { message: 'FTP account deleted' };
  }

  // Helpers for account resolution
  private async getOrCreateAccountForCustomer(customerId: string): Promise<string> {
    let account = await this.prisma.account.findFirst({ where: { customerId } });

    if (!account) {
      const adminUser = await this.prisma.user.findFirst({ where: { role: { in: ['ROOT', 'ADMIN'] } }, orderBy: { createdAt: 'asc' } });
      if (!adminUser) throw new NotFoundException('No admin user found to create account');
      account = await this.prisma.account.create({ data: { ownerId: adminUser.id, customerId, plan: 'BASIC', status: 'active' } });
    }

    return account.id;
  }

  async getOrCreateDefaultAdminAccount(): Promise<string> {
    let account = await this.prisma.account.findFirst({ orderBy: { createdAt: 'asc' } });
    if (!account) {
      const adminUser = await this.prisma.user.findFirst({ where: { role: { in: ['ROOT', 'ADMIN'] } }, orderBy: { createdAt: 'asc' } });
      if (!adminUser) throw new NotFoundException('No admin user found');
      account = await this.prisma.account.create({ data: { ownerId: adminUser.id, plan: 'BASIC', status: 'active' } });
    }
    return account.id;
  }
}
