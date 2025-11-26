import { Controller, Get, Post, Delete, Body, Param, Query, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DatabasesService } from './databases.service';
import { CreateDatabaseDto, CreateDatabaseUserDto, GrantPrivilegesDto } from './dto/database.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('databases')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('databases')
export class DatabasesController {
  constructor(private databasesService: DatabasesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all databases' })
  async findAllDatabases(@Request() req: any) {
    const accountId = req.user.accounts?.[0]?.id;
    return this.databasesService.findAllDatabases(accountId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get database by ID' })
  async findOneDatabase(@Param('id') id: string) {
    return this.databasesService.findOneDatabase(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new database' })
  async createDatabase(@Request() req: any, @Body() dto: CreateDatabaseDto) {
    const accountId = req.user.accounts?.[0]?.id;
    return this.databasesService.createDatabase(accountId, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete database' })
  async deleteDatabase(@Param('id') id: string) {
    return this.databasesService.deleteDatabase(id);
  }

  @Get('users/all')
  @ApiOperation({ summary: 'Get all database users' })
  async findAllUsers(@Query('databaseId') databaseId?: string) {
    return this.databasesService.findAllUsers(databaseId);
  }

  @Post('users')
  @ApiOperation({ summary: 'Create new database user' })
  async createUser(@Body() dto: CreateDatabaseUserDto & { databaseId: string }) {
    return this.databasesService.createUser(dto.databaseId, dto);
  }

  @Delete('users/:id')
  @ApiOperation({ summary: 'Delete database user' })
  async deleteUser(@Param('id') id: string) {
    return this.databasesService.deleteUser(id);
  }

  @Post('privileges')
  @ApiOperation({ summary: 'Grant privileges to user' })
  async grantPrivileges(@Body() dto: GrantPrivilegesDto) {
    return this.databasesService.grantPrivileges(dto);
  }

  @Get('privileges/:userId/:databaseId')
  @ApiOperation({ summary: 'Get user privileges for database' })
  async getPrivileges(
    @Param('userId') userId: string,
    @Param('databaseId') databaseId: string
  ) {
    return this.databasesService.getPrivileges(userId, databaseId);
  }
}
