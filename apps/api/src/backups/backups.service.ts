import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBackupDto, RestoreBackupDto } from './dto/backup.dto';

@Injectable()
export class BackupsService {
  constructor(private prisma: PrismaService) {}

  async findAll(accountId?: string) {
    return this.prisma.backup.findMany({
      where: accountId ? { accountId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const backup = await this.prisma.backup.findUnique({
      where: { id },
    });

    if (!backup) {
      throw new NotFoundException(`Backup with ID ${id} not found`);
    }

    return backup;
  }

  async create(dto: CreateBackupDto) {
    return this.prisma.backup.create({
      data: {
        accountId: dto.accountId,
        scope: dto.scope as any,
        location: dto.location,
        status: 'QUEUED',
      },
    });
  }

  async restore(dto: RestoreBackupDto) {
    const backup = await this.findOne(dto.backupId);

    // TODO: Queue restore job
    return {
      message: 'Restore job queued',
      backup,
      destination: dto.destination,
    };
  }

  async delete(id: string) {
    await this.findOne(id);

    await this.prisma.backup.delete({
      where: { id },
    });

    return { message: 'Backup deleted successfully' };
  }

  async getStorageStats() {
    const backups = await this.prisma.backup.findMany();

    return {
      totalBackups: backups.length,
      totalSize: backups.length * 450, // Mock: 450 MB average
      oldestBackup: backups[backups.length - 1]?.createdAt,
      newestBackup: backups[0]?.createdAt,
    };
  }
}
