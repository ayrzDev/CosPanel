import { IsString, IsNumber, IsOptional, IsArray, Min } from 'class-validator';

export class CreateHostingPlanDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  diskSpaceMB: number;

  @IsNumber()
  @Min(0)
  bandwidthMB: number;

  @IsNumber()
  @Min(0)
  emailAccounts: number;

  @IsNumber()
  @Min(0)
  databases: number;

  @IsNumber()
  @Min(0)
  ftpAccounts: number;

  @IsNumber()
  @Min(0)
  subdomains: number;

  @IsNumber()
  @Min(0)
  addonDomains: number;

  @IsNumber()
  @Min(0)
  parkedDomains: number;

  @IsNumber()
  @Min(0)
  monthlyPrice: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  yearlyPrice?: number;

  @IsArray()
  @IsOptional()
  features?: string[];
}

export class UpdateHostingPlanDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  diskSpaceMB?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  bandwidthMB?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  emailAccounts?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  databases?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  ftpAccounts?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  subdomains?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  addonDomains?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  parkedDomains?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  monthlyPrice?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  yearlyPrice?: number;

  @IsArray()
  @IsOptional()
  features?: string[];
}
