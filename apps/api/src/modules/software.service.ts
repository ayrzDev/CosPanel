import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class SoftwareService {
  constructor(private prisma: PrismaService) {}

  // PHP Version Management
  async getPHPVersions(accountId: string) {
    return this.prisma.pHPVersion.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async setPHPVersion(accountId: string, data: { path: string; version: string }) {
    // Check if account already has this version
    const existing = await this.prisma.pHPVersion.findFirst({
      where: { accountId, version: data.version },
    });

    if (existing) {
      return this.prisma.pHPVersion.update({
        where: { id: existing.id },
        data: { isActive: true },
      });
    }

    return this.prisma.pHPVersion.create({
      data: {
        accountId,
        version: data.version,
        isActive: true,
      },
    });
  }

  async deletePHPVersion(id: string, accountId: string) {
    const phpVersion = await this.prisma.pHPVersion.findFirst({
      where: { id, accountId },
    });
    if (!phpVersion) {
      throw new NotFoundException('PHP version configuration not found');
    }
    await this.prisma.pHPVersion.delete({ where: { id } });
    return { message: 'PHP version configuration deleted' };
  }

  // Installed Applications (Softaculous-style)
  async getInstalledApps(accountId: string) {
    return this.prisma.installedApp.findMany({
      where: { accountId },
      orderBy: { installDate: 'desc' },
    });
  }

  async installApp(accountId: string, data: { 
    name: string; 
    version: string; 
    path: string; 
    domain: string;
    appData?: any;
  }) {
    return this.prisma.installedApp.create({
      data: {
        accountId,
        name: data.name,
        version: data.version || '1.0.0',
        path: data.path,
      },
    });
  }

  async updateApp(id: string, accountId: string, data: { version: string }) {
    const app = await this.prisma.installedApp.findFirst({
      where: { id, accountId },
    });
    if (!app) {
      throw new NotFoundException('Installed app not found');
    }
    return this.prisma.installedApp.update({
      where: { id },
      data: { 
        version: data.version,

      },
    });
  }

  async uninstallApp(id: string, accountId: string) {
    const app = await this.prisma.installedApp.findFirst({
      where: { id, accountId },
    });
    if (!app) {
      throw new NotFoundException('Installed app not found');
    }
    await this.prisma.installedApp.delete({ where: { id } });
    return { message: 'App uninstalled successfully' };
  }
}
