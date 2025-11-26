import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthController } from '../routes/health.controller';
import { MetricsController } from '../metrics/metrics.controller';
import { DatabaseModule } from '../database/database.module';
import { AuthModule } from '../auth/auth.module';
import { DomainsModule } from '../domains/domains.module';
import { EmailModule } from '../email/email.module';
import { DatabasesModule } from '../databases/databases.module';
import { FilesModule } from '../files/files.module';
import { BackupsModule } from '../backups/backups.module';
import { SecurityModule } from '../security/security.module';
import { CustomersModule } from '../customers/customers.module';
import { HostingPlansModule } from '../hosting-plans/hosting-plans.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { TicketsModule } from '../tickets/tickets.module';
import { ServersModule } from '../servers/servers.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    DomainsModule,
    EmailModule,
    DatabasesModule,
    FilesModule,
    BackupsModule,
    SecurityModule,
    ServersModule,
    CustomersModule,
    HostingPlansModule,
    InvoicesModule,
    TicketsModule,
  ],
  controllers: [HealthController, MetricsController],
  providers: []
})
export class AppModule {}
