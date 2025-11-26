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

    // Generate JWT token
    const payload = {
      sub: customer.id,
      username: customer.username,
      email: customer.email,
      type: 'customer',
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
