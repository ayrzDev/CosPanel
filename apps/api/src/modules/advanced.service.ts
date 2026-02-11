import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AdvancedService {
  constructor(private prisma: PrismaService) {}

  // Error Pages
  async getErrorPages(accountId: string) {
    return this.prisma.errorPage.findMany({
      where: { accountId },
      orderBy: { errorCode: 'asc' },
    });
  }

  async setErrorPage(accountId: string, data: { errorCode: number; content: string }) {
    const existing = await this.prisma.errorPage.findFirst({
      where: { accountId, errorCode: data.errorCode },
    });

    if (existing) {
      return this.prisma.errorPage.update({
        where: { id: existing.id },
        data: { content: data.content },
      });
    }

    return this.prisma.errorPage.create({
      data: {
        accountId,
        errorCode: data.errorCode,
        content: data.content,
      },
    });
  }

  async deleteErrorPage(id: string, accountId: string) {
    const errorPage = await this.prisma.errorPage.findFirst({
      where: { id, accountId },
    });
    if (!errorPage) {
      throw new NotFoundException('Error page not found');
    }
    await this.prisma.errorPage.delete({ where: { id } });
    return { message: 'Error page deleted' };
  }

  // MIME Types
  async getMimeTypes(accountId: string) {
    return this.prisma.mimeType.findMany({
      where: { accountId },
      orderBy: { extension: 'asc' },
    });
  }

  async addMimeType(accountId: string, data: { extension: string; mimeType: string; handler?: string }) {
    return this.prisma.mimeType.create({
      data: {
        accountId,
        extension: data.extension,
        mimeType: data.mimeType,
        handler: data.handler,
      },
    });
  }

  async updateMimeType(id: string, accountId: string, data: { mimeType?: string; handler?: string }) {
    const mimeType = await this.prisma.mimeType.findFirst({
      where: { id, accountId },
    });
    if (!mimeType) {
      throw new NotFoundException('MIME type not found');
    }
    return this.prisma.mimeType.update({
      where: { id },
      data,
    });
  }

  async deleteMimeType(id: string, accountId: string) {
    const mimeType = await this.prisma.mimeType.findFirst({
      where: { id, accountId },
    });
    if (!mimeType) {
      throw new NotFoundException('MIME type not found');
    }
    await this.prisma.mimeType.delete({ where: { id } });
    return { message: 'MIME type deleted' };
  }

  // Cron Jobs
  async getCronJobs(accountId: string) {
    return this.prisma.cronJob.findMany({
      where: { accountId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createCronJob(accountId: string, data: { 
    command: string; 
    schedule: string; 
    isActive?: boolean 
  }) {
    return this.prisma.cronJob.create({
      data: {
        accountId,
        command: data.command,
        schedule: data.schedule,
        isActive: data.isActive !== false,
      },
    });
  }

  async updateCronJob(id: string, accountId: string, data: { 
    command?: string; 
    schedule?: string; 
    isActive?: boolean 
  }) {
    const cronJob = await this.prisma.cronJob.findFirst({
      where: { id, accountId },
    });
    if (!cronJob) {
      throw new NotFoundException('Cron job not found');
    }
    return this.prisma.cronJob.update({
      where: { id },
      data,
    });
  }

  async deleteCronJob(id: string, accountId: string) {
    const cronJob = await this.prisma.cronJob.findFirst({
      where: { id, accountId },
    });
    if (!cronJob) {
      throw new NotFoundException('Cron job not found');
    }
    await this.prisma.cronJob.delete({ where: { id } });
    return { message: 'Cron job deleted' };
  }

  // Terminal Sessions
  async getTerminalSessions(accountId: string) {
    return this.prisma.terminalSession.findMany({
      where: { accountId },
      orderBy: { startedAt: 'desc' },
    });
  }

  async createTerminalSession(accountId: string) {
    return this.prisma.terminalSession.create({
      data: {
        accountId,
        sessionId: `term_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        isActive: true,
      },
    });
  }

  async closeTerminalSession(id: string, accountId: string) {
    const session = await this.prisma.terminalSession.findFirst({
      where: { id, accountId },
    });
    if (!session) {
      throw new NotFoundException('Terminal session not found');
    }
    return this.prisma.terminalSession.update({
      where: { id },
      data: { 
        isActive: false,
        endedAt: new Date(),
      },
    });
  }
}
