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
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateInvoiceDto, UpdateInvoiceDto } from './dto/invoice.dto';

@Controller('invoices')
@UseGuards(JwtAuthGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  async create(@Body() createInvoiceDto: CreateInvoiceDto, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.invoicesService.create(createInvoiceDto, adminId);
  }

  @Get()
  async findAll(@Request() req: any) {
    const adminId = req.user.userId;
    return await this.invoicesService.findAll(adminId);
  }

  @Get('customer/:customerId')
  async findByCustomer(@Param('customerId') customerId: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.invoicesService.findByCustomer(customerId, adminId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    const invoice = await this.invoicesService.findOne(id, adminId);
    
    if (!invoice) {
      throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    }
    
    return invoice;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @Request() req: any,
  ) {
    const adminId = req.user.userId;
    return await this.invoicesService.update(id, updateInvoiceDto, adminId);
  }

  @Put(':id/pay')
  async markAsPaid(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.invoicesService.markAsPaid(id, adminId);
  }

  @Put(':id/cancel')
  async markAsCancelled(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.invoicesService.markAsCancelled(id, adminId);
  }
}
