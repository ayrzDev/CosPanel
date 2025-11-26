import { Module } from '@nestjs/common';
import { HostingPlansController } from './hosting-plans.controller';
import { HostingPlansService } from './hosting-plans.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [HostingPlansController],
  providers: [HostingPlansService],
  exports: [HostingPlansService],
})
export class HostingPlansModule {}
