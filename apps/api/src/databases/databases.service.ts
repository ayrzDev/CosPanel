import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateDatabaseDto, CreateDatabaseUserDto, GrantPrivilegesDto } from './dto/database.dto';

@Injectable()
export class DatabasesService {
  constructor(private prisma: PrismaService) {}

  async findAllDatabases(accountId: string) {
    return this.prisma.managedDatabase.findMany({
      where: { accountId },
      include: {
        users: true,
        privileges: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOneDatabase(id: string) {
    const db = await this.prisma.managedDatabase.findUnique({
      where: { id },
      include: {
        users: true,
        privileges: true,
      },
    });
    
    if (!db) {
      throw new NotFoundException(`Database with ID ${id} not found`);
    }
    
    return db;
  }

  async createDatabase(accountId: string, dto: CreateDatabaseDto) {
    return this.prisma.managedDatabase.create({
      data: {
        accountId,
        name: dto.name,
        type: dto.type || 'MYSQL',
        host: 'localhost',
        port: dto.type === 'POSTGRESQL' ? 5432 : 3306,
        username: dto.username,
        password: dto.password,
        size: 0,
      },
    });
  }

  async deleteDatabase(id: string) {
    await this.findOneDatabase(id); // Check if exists
    
    await this.prisma.managedDatabase.delete({
      where: { id },
    });
    
    return { message: 'Database deleted successfully' };
  }

  async findAllUsers(databaseId?: string) {
    return this.prisma.databaseUser.findMany({
      where: databaseId ? { databaseId } : undefined,
      include: {
        database: true,
        privileges: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createUser(databaseId: string, dto: CreateDatabaseUserDto) {
    return this.prisma.databaseUser.create({
      data: {
        databaseId,
        username: dto.username,
        password: dto.password,
        host: dto.host || 'localhost',
      },
    });
  }

  async deleteUser(id: string) {
    const user = await this.prisma.databaseUser.findUnique({
      where: { id },
    });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prisma.databaseUser.delete({
      where: { id },
    });
    
    return { message: 'User deleted successfully' };
  }

  async grantPrivileges(dto: GrantPrivilegesDto) {
    // Check if privilege already exists
    const existing = await this.prisma.databasePrivilege.findUnique({
      where: {
        databaseId_userId: {
          databaseId: dto.databaseId,
          userId: dto.userId,
        },
      },
    });

    if (existing) {
      // Update existing privileges
      return this.prisma.databasePrivilege.update({
        where: { id: existing.id },
        data: {
          privileges: dto.privileges.join(','),
        },
      });
    }

    // Create new privileges
    return this.prisma.databasePrivilege.create({
      data: {
        databaseId: dto.databaseId,
        userId: dto.userId,
        privileges: dto.privileges.join(','),
      },
    });
  }

  async getPrivileges(userId: string, databaseId: string) {
    return this.prisma.databasePrivilege.findUnique({
      where: {
        databaseId_userId: {
          databaseId,
          userId,
        },
      },
      include: {
        database: true,
        user: true,
      },
    });
  }
}
