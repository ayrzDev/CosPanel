import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../database/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class CustomerAuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  // Ensure customer has an account, create if not exists
  private async ensureCustomerAccount(customerId: string, adminId: string): Promise<string> {
    // Check if customer already has an account
    const existingAccount = await this.prisma.account.findFirst({
      where: { customerId },
    });
    
    if (existingAccount) {
      return existingAccount.id;
    }
    
    // Create new account for customer
    const newAccount = await this.prisma.account.create({
      data: {
        ownerId: adminId,
        customerId: customerId,
        plan: 'BASIC',
        status: 'active',
      },
    });
    
    return newAccount.id;
  }

  async login(dto: { username: string; password: string }) {
    const customer = await this.prisma.customer.findFirst({
      where: {
        OR: [
          { username: dto.username },
          { email: dto.username },
        ],
      },
      include: {
        hostingPlan: {
          select: {
            name: true,
            diskSpaceMB: true,
            bandwidthMB: true,
          },
        },
        accounts: {
          select: {
            id: true,
            plan: true,
            status: true,
          },
        },
      },
    });

    if (!customer) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // TODO: In production, verify password hash properly
    // For now, we'll allow login for active customers
    if (customer.status !== 'ACTIVE') {
      throw new UnauthorizedException('Account is not active');
    }

    // Ensure customer has an account (create if not exists)
    let accountId = customer.accounts?.[0]?.id;
    if (!accountId) {
      // Use customer's admin as owner, or find a root user
      const adminUser = await this.prisma.user.findFirst({
        where: { role: { in: ['ROOT', 'ADMIN'] } },
        orderBy: { createdAt: 'asc' },
      });
      
      if (adminUser) {
        accountId = await this.ensureCustomerAccount(customer.id, adminUser.id);
      }
    }

    // Generate JWT token
    const payload = {
      sub: customer.id,
      username: customer.username,
      email: customer.email,
      type: 'customer',
      accountId, // Include accountId in token
    };
    const accessToken = this.jwtService.sign(payload);

    // Calculate expiration (24 hours from now)
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    // Create session record
    await this.prisma.session.create({
      data: {
        customerId: customer.id,
        token: accessToken,
        tokenType: 'ACCESS',
        expiresAt,
        isActive: true,
      },
    });

    // Update last login
    await this.prisma.customer.update({
      where: { id: customer.id },
      data: { lastLogin: new Date() },
    });

    return {
      customer: {
        id: customer.id,
        username: customer.username,
        fullName: customer.fullName,
        email: customer.email,
        status: customer.status,
        hostingPlan: customer.hostingPlan,
      },
      accessToken,
      expiresAt,
    };
  }

  async logout(token: string) {
    // Deactivate the session
    await this.prisma.session.updateMany({
      where: { token, isActive: true },
      data: { isActive: false },
    });

    return { message: 'Logged out successfully' };
  }

  async validateToken(token: string) {
    const session = await this.prisma.session.findUnique({
      where: { token },
      include: { customer: true },
    });

    if (!session) {
      throw new UnauthorizedException('Invalid token');
    }

    if (!session.isActive) {
      throw new UnauthorizedException('Session has been terminated');
    }

    if (new Date() > session.expiresAt) {
      // Deactivate expired session
      await this.prisma.session.update({
        where: { id: session.id },
        data: { isActive: false },
      });
      throw new UnauthorizedException('Token has expired');
    }

    // Update last used timestamp
    await this.prisma.session.update({
      where: { id: session.id },
      data: { lastUsedAt: new Date() },
    });

    return {
      valid: true,
      customer: session.customer,
    };
  }

  async cleanupExpiredSessions() {
    // Deactivate all expired sessions
    const result = await this.prisma.session.updateMany({
      where: {
        expiresAt: { lt: new Date() },
        isActive: true,
      },
      data: { isActive: false },
    });

    return { deactivated: result.count };
  }
}
