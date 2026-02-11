import { Module } from '@nestjs/common';
import { AdvancedController } from './advanced.controller';
import { AdvancedService } from './advanced.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [AdvancedController],
  providers: [AdvancedService],
  exports: [AdvancedService],
})
export class AdvancedModule {}
