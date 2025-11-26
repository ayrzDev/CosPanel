import { IsString, IsArray, IsOptional, IsBoolean, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class InstallSSLDto {
  @ApiProperty({ example: 'domain_id' })
  @IsString()
  domainId: string;

  @ApiProperty({ example: 'LETS_ENCRYPT', enum: ['LETS_ENCRYPT', 'CUSTOM', 'SELF_SIGNED'] })
  @IsEnum(['LETS_ENCRYPT', 'CUSTOM', 'SELF_SIGNED'])
  @IsOptional()
  type?: string;

  @ApiProperty({ example: '-----BEGIN CERTIFICATE-----...' })
  @IsString()
  certificate: string;

  @ApiProperty({ example: '-----BEGIN PRIVATE KEY-----...' })
  @IsString()
  privateKey: string;

  @ApiProperty({ example: '-----BEGIN CERTIFICATE-----...' })
  @IsOptional()
  @IsString()
  chain?: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  autoRenew?: boolean;
}

export class GenerateCSRDto {
  @ApiProperty({ example: 'siyezden.com' })
  @IsString()
  commonName: string;

  @ApiProperty({ example: 'TR' })
  @IsString()
  country: string;

  @ApiProperty({ example: 'Istanbul' })
  @IsString()
  state: string;

  @ApiProperty({ example: 'Umixpanel Inc.' })
  @IsString()
  organization: string;
}

export class BlockIPDto {
  @ApiProperty({ example: '192.168.1.100' })
  @IsString()
  ipAddress: string;

  @ApiProperty({ example: 'Brute force attempt' })
  @IsString()
  reason: string;

  @ApiProperty({ example: '2025-12-31' })
  @IsOptional()
  @IsString()
  expiresAt?: string;
}

export class CreateFirewallRuleDto {
  @ApiProperty({ example: 'Allow SSH' })
  @IsString()
  name: string;

  @ApiProperty({ example: 22 })
  @IsNumber()
  port: number;

  @ApiProperty({ example: 'TCP', enum: ['TCP', 'UDP', 'BOTH'] })
  @IsString()
  @IsOptional()
  protocol?: string;

  @ApiProperty({ example: '0.0.0.0/0' })
  @IsString()
  @IsOptional()
  source?: string;

  @ApiProperty({ example: 'ALLOW', enum: ['ALLOW', 'DENY'] })
  @IsString()
  @IsOptional()
  action?: string;
}
