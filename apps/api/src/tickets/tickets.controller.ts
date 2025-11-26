import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateTicketDto, UpdateTicketDto, AddReplyDto } from './dto/ticket.dto';

@Controller('tickets')
@UseGuards(JwtAuthGuard)
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Post()
  async create(@Body() createTicketDto: CreateTicketDto, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.ticketsService.create(createTicketDto, adminId);
  }

  @Get()
  async findAll(@Request() req: any) {
    const adminId = req.user.userId;
    return await this.ticketsService.findAll(adminId);
  }

  @Get('customer/:customerId')
  async findByCustomer(@Param('customerId') customerId: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.ticketsService.findByCustomer(customerId, adminId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    const ticket = await this.ticketsService.findOne(id, adminId);
    
    if (!ticket) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }
    
    return ticket;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @Request() req: any,
  ) {
    const adminId = req.user.userId;
    return await this.ticketsService.update(id, updateTicketDto, adminId);
  }

  @Post(':id/reply')
  async addReply(
    @Param('id') id: string,
    @Body() addReplyDto: AddReplyDto,
    @Request() req: any,
  ) {
    const adminId = req.user.userId;
    const userId = req.user.userId;
    return await this.ticketsService.addReply(id, addReplyDto, userId, adminId);
  }

  @Put(':id/close')
  async close(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.ticketsService.updateStatus(id, 'CLOSED', adminId);
  }

  @Put(':id/reopen')
  async reopen(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.ticketsService.updateStatus(id, 'OPEN', adminId);
  }
}
