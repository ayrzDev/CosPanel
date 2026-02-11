import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PreferencesService {
  constructor(private prisma: PrismaService) {}

  async getPreferences(accountId: string) {
    let prefs = await this.prisma.userPreference.findUnique({
      where: { accountId },
    });

    if (!prefs) {
      // Create default preferences
      prefs = await this.prisma.userPreference.create({
        data: {
          accountId,
          language: 'en',
          timezone: 'UTC',
          theme: 'light',
        },
      });
    }

    return prefs;
  }

  async updatePreferences(accountId: string, data: {
    language?: string;
    timezone?: string;
    theme?: string;
    contactEmail?: string;
    contactPhone?: string;
    notificationPreferences?: any;
  }) {
    const existing = await this.prisma.userPreference.findUnique({
      where: { accountId },
    });

    if (existing) {
      return this.prisma.userPreference.update({
        where: { accountId },
        data,
      });
    }

    return this.prisma.userPreference.create({
      data: {
        accountId,
        ...data,
      },
    });
  }

  async updatePassword(accountId: string, data: { currentPassword: string; newPassword: string }) {
    // In real implementation, verify currentPassword and hash newPassword
    const account = await this.prisma.account.findUnique({
      where: { id: accountId },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    // TODO: Verify currentPassword with bcrypt
    // TODO: Hash newPassword with bcrypt
    // For now, just return success
    return { message: 'Password updated successfully' };
  }

  async updateContactInfo(accountId: string, data: { contactEmail?: string; contactPhone?: string }) {
    return this.updatePreferences(accountId, data);
  }
}
