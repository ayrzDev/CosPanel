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
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import { CreateCustomerDto, UpdateCustomerDto } from './dto/customer.dto';

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto, @Request() req: any) {
    try {
      const adminId = req.user.userId;
      return await this.customersService.create(createCustomerDto, adminId);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Failed to create customer',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Public()
  @Get()
  async findAll(@Request() req: any) {
    // If authenticated, filter by admin
    if (req.user?.userId) {
      const adminId = req.user.userId;
      return await this.customersService.findAll(adminId);
    }
    // Public access - return all active customers (for demo)
    return await this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    const customer = await this.customersService.findOne(id, adminId);
    
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    
    return customer;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Request() req: any,
  ) {
    const adminId = req.user.userId;
    return await this.customersService.update(id, updateCustomerDto, adminId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.customersService.remove(id, adminId);
  }

  @Put(':id/suspend')
  async suspend(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.customersService.updateStatus(id, 'SUSPENDED', adminId);
  }

  @Put(':id/activate')
  async activate(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.customersService.updateStatus(id, 'ACTIVE', adminId);
  }

  @Put(':id/terminate')
  async terminate(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.customersService.updateStatus(id, 'TERMINATED', adminId);
  }

  @Get(':id/invoices')
  async getInvoices(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.customersService.getCustomerInvoices(id, adminId);
  }

  @Get(':id/tickets')
  async getTickets(@Param('id') id: string, @Request() req: any) {
    const adminId = req.user.userId;
    return await this.customersService.getCustomerTickets(id, adminId);
  }
}
