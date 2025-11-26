import { IsString, IsIP, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateServerDto {
  @IsString()
  name: string;

  @IsString()
  hostname: string;

  @IsIP()
  ipAddress: string;

  @IsString()
  @IsOptional()
  nameserver1?: string;

  @IsString()
  @IsOptional()
  nameserver2?: string;

  @IsString()
  @IsOptional()
  nameserver3?: string;

  @IsString()
  @IsOptional()
  nameserver4?: string;

  @IsNumber()
  maxAccounts: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateServerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  hostname?: string;

  @IsIP()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  nameserver1?: string;

  @IsString()
  @IsOptional()
  nameserver2?: string;

  @IsString()
  @IsOptional()
  nameserver3?: string;

  @IsString()
  @IsOptional()
  nameserver4?: string;

  @IsNumber()
  @IsOptional()
  maxAccounts?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateIpAddressDto {
  @IsIP()
  ipAddress: string;

  @IsString()
  serverId: string;

  @IsBoolean()
  @IsOptional()
  isShared?: boolean;

  @IsString()
  @IsOptional()
  customerId?: string;
}

export class UpdateIpAddressDto {
  @IsIP()
  @IsOptional()
  ipAddress?: string;

  @IsString()
  @IsOptional()
  serverId?: string;

  @IsBoolean()
  @IsOptional()
  isShared?: boolean;

  @IsString()
  @IsOptional()
  customerId?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
