import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';

@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService) {}

  async create(createInvoiceDto: CreateInvoiceDto, adminId: string) {
    // Verify customer belongs to admin
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: createInvoiceDto.customerId,
        adminId,
      },
    });

    if (!customer) {
      throw new HttpException(
        'Customer not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.invoice.create({
      data: {
        customerId: createInvoiceDto.customerId,
        invoiceNumber: createInvoiceDto.invoiceNumber,
        description: createInvoiceDto.description || '',
        amount: createInvoiceDto.amount,
        total: createInvoiceDto.total,
        tax: createInvoiceDto.tax,
        status: createInvoiceDto.status,
        dueDate: createInvoiceDto.dueDate,
      },
      include: {
        customer: true,
      },
    });
  }

  async findAll(adminId: string) {
    return await this.prisma.invoice.findMany({
      where: {
        customer: {
          adminId,
        },
      },
      include: {
        customer: {
          select: {
            id: true,
            username: true,
            email: true,
            fullName: true,
            companyName: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCustomer(customerId: string, adminId: string) {
    // Verify customer belongs to admin
    const customer = await this.prisma.customer.findFirst({
      where: { id: customerId, adminId },
    });

    if (!customer) {
      throw new HttpException(
        'Customer not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.invoice.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, adminId: string) {
    return await this.prisma.invoice.findFirst({
      where: {
        id,
        customer: {
          adminId,
        },
      },
      include: {
        customer: true,
      },
    });
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto, adminId: string) {
    const invoice = await this.findOne(id, adminId);
    if (!invoice) {
      throw new HttpException(
        'Invoice not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.invoice.update({
      where: { id },
      data: updateInvoiceDto,
      include: {
        customer: true,
      },
    });
  }

  async markAsPaid(id: string, adminId: string) {
    const invoice = await this.findOne(id, adminId);
    if (!invoice) {
      throw new HttpException(
        'Invoice not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.invoice.update({
      where: { id },
      data: {
        status: 'PAID',
        paidDate: new Date(),
      },
      include: {
        customer: true,
      },
    });
  }

  async markAsCancelled(id: string, adminId: string) {
    const invoice = await this.findOne(id, adminId);
    if (!invoice) {
      throw new HttpException(
        'Invoice not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.invoice.update({
      where: { id },
      data: { status: 'CANCELLED' },
      include: {
        customer: true,
      },
    });
  }
}
