import { Controller, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { CustomerAuthService } from './customer-auth.service';

@Controller('customer-auth')
export class CustomerAuthController {
  constructor(private readonly authService: CustomerAuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    try {
      return await this.authService.login(loginDto);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Login failed',
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Post('logout')
  async logout(@Headers('authorization') authorization: string) {
    try {
      const token = authorization?.replace('Bearer ', '');
      if (!token) {
        throw new HttpException('No token provided', HttpStatus.BAD_REQUEST);
      }
      return await this.authService.logout(token);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Logout failed',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('validate')
  async validate(@Headers('authorization') authorization: string) {
    try {
      const token = authorization?.replace('Bearer ', '');
      if (!token) {
        throw new HttpException('No token provided', HttpStatus.BAD_REQUEST);
      }
      return await this.authService.validateToken(token);
    } catch (error: any) {
      throw new HttpException(
        error.message || 'Token validation failed',
        HttpStatus.UNAUTHORIZED
      );
    }
  }
}
