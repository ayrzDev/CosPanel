import { IsString, IsEmail, IsOptional, IsNumber, IsEnum } from 'class-validator';

export enum CustomerStatus {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  TERMINATED = 'TERMINATED',
  PENDING = 'PENDING',
}

export enum BillingCycle {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
}

export class CreateCustomerDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  fullName: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  hostingPlanId: string;

  @IsNumber()
  @IsOptional()
  diskQuotaMB?: number;

  @IsNumber()
  @IsOptional()
  bandwidthQuotaMB?: number;

  @IsNumber()
  @IsOptional()
  emailAccountLimit?: number;

  @IsNumber()
  @IsOptional()
  databaseLimit?: number;

  @IsNumber()
  @IsOptional()
  ftpAccountLimit?: number;

  @IsEnum(BillingCycle)
  @IsOptional()
  billingCycle?: BillingCycle;

  @IsEnum(CustomerStatus)
  @IsOptional()
  status?: CustomerStatus;
}

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  hostingPlanId?: string;

  @IsNumber()
  @IsOptional()
  diskQuotaMB?: number;

  @IsNumber()
  @IsOptional()
  bandwidthQuotaMB?: number;

  @IsNumber()
  @IsOptional()
  emailAccountLimit?: number;

  @IsNumber()
  @IsOptional()
  databaseLimit?: number;

  @IsNumber()
  @IsOptional()
  ftpAccountLimit?: number;

  @IsEnum(BillingCycle)
  @IsOptional()
  billingCycle?: BillingCycle;

  @IsEnum(CustomerStatus)
  @IsOptional()
  status?: CustomerStatus;
}
