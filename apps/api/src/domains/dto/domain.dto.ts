import { IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDomainDto {
  @ApiProperty({ example: 'example.com' })
  @IsString()
  fqdn: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsString()
  accountId: string;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000001', required: false })
  @IsOptional()
  @IsString()
  customerId?: string;

  @ApiProperty({ example: 'ADDON', enum: ['PRIMARY', 'ADDON', 'SUBDOMAIN', 'PARKED'], required: false })
  @IsOptional()
  @IsEnum(['PRIMARY', 'ADDON', 'SUBDOMAIN', 'PARKED'])
  domainType?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;

  @ApiProperty({ example: '00000000-0000-0000-0000-000000000002', required: false })
  @IsOptional()
  @IsString()
  parentDomainId?: string;

  @ApiProperty({ example: 'public_html/blog', required: false })
  @IsOptional()
  @IsString()
  documentRoot?: string;
}

export class UpdateSSLDto {
  @ApiProperty({ example: 'ACTIVE', enum: ['NONE', 'PENDING', 'ACTIVE', 'ERROR'] })
  @IsEnum(['NONE', 'PENDING', 'ACTIVE', 'ERROR'])
  sslStatus: string;
}

