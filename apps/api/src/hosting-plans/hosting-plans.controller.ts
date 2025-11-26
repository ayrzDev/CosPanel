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
import { HostingPlansService } from './hosting-plans.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Public } from '../auth/public.decorator';
import { CreateHostingPlanDto, UpdateHostingPlanDto } from './dto/hosting-plan.dto';

@Controller('hosting-plans')
@UseGuards(JwtAuthGuard)
export class HostingPlansController {
  constructor(private readonly hostingPlansService: HostingPlansService) {}

  @Post()
  async create(@Body() createHostingPlanDto: CreateHostingPlanDto) {
    return await this.hostingPlansService.create(createHostingPlanDto);
  }

  @Public()
  @Get()
  async findAll() {
    return await this.hostingPlansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const plan = await this.hostingPlansService.findOne(id);
    
    if (!plan) {
      throw new HttpException('Hosting plan not found', HttpStatus.NOT_FOUND);
    }
    
    return plan;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateHostingPlanDto: UpdateHostingPlanDto,
  ) {
    return await this.hostingPlansService.update(id, updateHostingPlanDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.hostingPlansService.remove(id);
  }
}
