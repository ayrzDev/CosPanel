import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET') || 'your-secret-key-change-in-production',
    });
  }

  async validate(payload: any) {
    // Check if this is a customer token
    if (payload.type === 'customer') {
      const customer = await this.prisma.customer.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          username: true,
          status: true,
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
        throw new UnauthorizedException('Customer not found');
      }

      if (customer.status !== 'ACTIVE') {
        throw new UnauthorizedException('Customer account is not active');
      }

      // Use accountId from token if accounts array is empty
      let accounts = customer.accounts;
      if (accounts.length === 0 && payload.accountId) {
        accounts = [{ id: payload.accountId, plan: 'BASIC' as any, status: 'active' }];
      }

      return {
        ...customer,
        accounts,
        type: 'customer',
      };
    }

    // Default: User (admin) token
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        role: true,
        accounts: {
          select: {
            id: true,
            plan: true,
            status: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      ...user,
      type: 'user',
    };
  }
}
