import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTicketDto, UpdateTicketDto, AddReplyDto } from './dto/ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto, adminId: string) {
    // Verify customer belongs to admin
    const customer = await this.prisma.customer.findFirst({
      where: {
        id: createTicketDto.customerId,
        adminId,
      },
    });

    if (!customer) {
      throw new HttpException(
        'Customer not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.supportTicket.create({
      data: createTicketDto,
      include: {
        customer: true,
      },
    });
  }

  async findAll(adminId: string) {
    return await this.prisma.supportTicket.findMany({
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

    return await this.prisma.supportTicket.findMany({
      where: { customerId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, adminId: string) {
    return await this.prisma.supportTicket.findFirst({
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

  async update(id: string, updateTicketDto: UpdateTicketDto, adminId: string) {
    const ticket = await this.findOne(id, adminId);
    if (!ticket) {
      throw new HttpException(
        'Ticket not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.supportTicket.update({
      where: { id },
      data: updateTicketDto,
      include: {
        customer: true,
      },
    });
  }

  async addReply(id: string, addReplyDto: AddReplyDto, userId: string, adminId: string) {
    const ticket = await this.findOne(id, adminId);
    if (!ticket) {
      throw new HttpException(
        'Ticket not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    const currentReplies = (ticket.replies as any[]) || [];
    const newReply = {
      message: addReplyDto.message,
      userId,
      createdAt: new Date().toISOString(),
    };

    return await this.prisma.supportTicket.update({
      where: { id },
      data: {
        replies: [...currentReplies, newReply],
        updatedAt: new Date(),
      },
      include: {
        customer: true,
      },
    });
  }

  async updateStatus(id: string, status: string, adminId: string) {
    const ticket = await this.findOne(id, adminId);
    if (!ticket) {
      throw new HttpException(
        'Ticket not found or unauthorized',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.supportTicket.update({
      where: { id },
      data: { status: status as any },
      include: {
        customer: true,
      },
    });
  }
}
