import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  async create(createCustomerDto: CreateCustomerDto, adminId: string) {
    // Check if username already exists
    const existingCustomer = await this.prisma.customer.findUnique({
      where: { username: createCustomerDto.username },
    });

    if (existingCustomer) {
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Check if email already exists
    const existingEmail = await this.prisma.customer.findUnique({
      where: { email: createCustomerDto.email },
    });

    if (existingEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    // Create home directory path
    const homeDirectory = `/home/${createCustomerDto.username}`;

    // Create customer
    const customer = await this.prisma.customer.create({
      data: {
        ...createCustomerDto,
        adminId,
        homeDirectory,
      },
      include: {
        hostingPlan: true,
      },
    });

    // Create file system structure
    try {
      await this.createFileSystemStructure(customer.username, homeDirectory);
    } catch (error) {
      console.error('Failed to create file system:', error);
      // Don't fail customer creation if file system fails
    }

    return customer;
  }

  async findAll(adminId?: string) {
    const where = adminId ? { adminId } : {};
    
    return await this.prisma.customer.findMany({
      where,
      include: {
        hostingPlan: true,
        _count: {
          select: {
            accounts: true,
            invoices: true,
            tickets: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, adminId: string) {
    return await this.prisma.customer.findFirst({
      where: { id, adminId },
      include: {
        hostingPlan: true,
        accounts: true,
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
        tickets: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto, adminId: string) {
    // Verify ownership
    const customer = await this.findOne(id, adminId);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.customer.update({
      where: { id },
      data: updateCustomerDto,
      include: {
        hostingPlan: true,
      },
    });
  }

  async remove(id: string, adminId: string) {
    // Verify ownership
    const customer = await this.findOne(id, adminId);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    // Delete customer (cascade will handle related records)
    await this.prisma.customer.delete({
      where: { id },
    });

    // Optionally delete file system (be careful!)
    // await this.deleteFileSystemStructure(customer.homeDirectory);

    return { message: 'Customer deleted successfully' };
  }

  async updateStatus(id: string, status: string, adminId: string) {
    // Verify ownership
    const customer = await this.findOne(id, adminId);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.customer.update({
      where: { id },
      data: { status: status as any },
      include: {
        hostingPlan: true,
      },
    });
  }

  async getCustomerInvoices(customerId: string, adminId: string) {
    // Verify ownership
    const customer = await this.findOne(customerId, adminId);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.invoice.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCustomerTickets(customerId: string, adminId: string) {
    // Verify ownership
    const customer = await this.findOne(customerId, adminId);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }

    return await this.prisma.supportTicket.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async createFileSystemStructure(username: string, homeDirectory: string) {
    // Base directory structure for cPanel-style hosting
    const baseDir = path.join(process.cwd(), 'storage', 'customers', username);
    
    const directories = [
      '',
      '.cpanel',
      '.cpanel/datastore',
      '.cpanel/email_accounts',
      '.cpanel/themes',
      '.caldav',
      '.cl.selector',
      'mail',
      'public_html',
      'public_html/cgi-bin',
      'public_ftp',
      'ssl',
      'ssl/certs',
      'ssl/keys',
      'ssl/csrs',
      'logs',
      'tmp',
      'etc',
      'backup',
      'www', // Symlink to public_html
      '.ssh',
      '.well-known',
      '.well-known/acme-challenge',
    ];

    try {
      for (const dir of directories) {
        const fullPath = path.join(baseDir, dir);
        await fs.mkdir(fullPath, { recursive: true, mode: 0o755 });
      }

      // Create default index.html
      const indexHtml = `<!DOCTYPE html>
<html>
<head>
    <title>Welcome to ${username}</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #333; }
    </style>
</head>
<body>
    <h1>Welcome to ${username}</h1>
    <p>Your hosting account is active!</p>
</body>
</html>`;

      await fs.writeFile(
        path.join(baseDir, 'public_html', 'index.html'),
        indexHtml,
      );

      // Create .htaccess
      const htaccess = `# BEGIN Default Configuration
DirectoryIndex index.html index.php
Options -Indexes
# END Default Configuration`;

      await fs.writeFile(
        path.join(baseDir, 'public_html', '.htaccess'),
        htaccess,
      );

      console.log(`File system created for customer: ${username}`);
    } catch (error) {
      console.error(`Failed to create file system for ${username}:`, error);
      throw error;
    }
  }

  private async deleteFileSystemStructure(homeDirectory: string) {
    const baseDir = path.join(
      process.cwd(),
      'storage',
      'customers',
      path.basename(homeDirectory),
    );

    try {
      await fs.rm(baseDir, { recursive: true, force: true });
      console.log(`File system deleted: ${baseDir}`);
    } catch (error) {
      console.error(`Failed to delete file system:`, error);
    }
  }
}
