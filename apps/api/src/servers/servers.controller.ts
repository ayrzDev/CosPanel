import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ServersService } from './servers.service';
import { CreateServerDto, UpdateServerDto, CreateIpAddressDto, UpdateIpAddressDto } from './dto/server.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('servers')
@UseGuards(JwtAuthGuard)
export class ServersController {
  constructor(private readonly serversService: ServersService) {}

  // Server endpoints
  @Post()
  async createServer(@Body() createServerDto: CreateServerDto, @Request() req: any) {
    try {
      const adminId = req.user.userId;
      return await this.serversService.createServer(createServerDto, adminId);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Failed to create server',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAllServers(@Request() req: any) {
    const adminId = req.user.userId;
    return await this.serversService.findAllServers(adminId);
  }

  @Get(':id')
  async findOneServer(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.serversService.findOneServer(id, adminId);
  }

  @Put(':id')
  async updateServer(
    @Param('id') id: string,
    @Body() updateServerDto: UpdateServerDto,
    @Request() req: any,
  ) {
    try {
      const adminId = req.user.userId;
      return await this.serversService.updateServer(id, updateServerDto, adminId);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Failed to update server',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteServer(@Param('id') id: string, @Request() req: any) {
    try {
      const adminId = req.user.userId;
      return await this.serversService.deleteServer(id, adminId);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Failed to delete server',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // IP Address endpoints
  @Post('ip-addresses')
  async createIpAddress(@Body() createIpDto: CreateIpAddressDto, @Request() req: any) {
    try {
      const adminId = req.user.userId;
      return await this.serversService.createIpAddress(createIpDto, adminId);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Failed to create IP address',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('ip-addresses/all')
  async findAllIpAddresses(@Request() req: any, @Query('serverId') serverId?: string) {
    const adminId = req.user.userId;
    return await this.serversService.findAllIpAddresses(adminId, serverId);
  }

  @Get('ip-addresses/available')
  async getAvailableIps(@Request() req: any, @Query('serverId') serverId?: string) {
    const adminId = req.user.userId;
    return await this.serversService.getAvailableIps(adminId, serverId);
  }

  @Get('ip-addresses/:id')
  async findOneIpAddress(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.serversService.findOneIpAddress(id, adminId);
  }

  @Put('ip-addresses/:id')
  async updateIpAddress(
    @Param('id') id: string,
    @Body() updateIpDto: UpdateIpAddressDto,
    @Request() req: any,
  ) {
    try {
      const adminId = req.user.userId;
      return await this.serversService.updateIpAddress(id, updateIpDto, adminId);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Failed to update IP address',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('ip-addresses/:id')
  async deleteIpAddress(@Param('id') id: string, @Request() req: any) {
    try {
      const adminId = req.user.userId;
      return await this.serversService.deleteIpAddress(id, adminId);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Failed to delete IP address',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
