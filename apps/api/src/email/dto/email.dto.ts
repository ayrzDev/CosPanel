import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmailAccountDto {
  @ApiProperty({ example: 'admin@siyezden.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  password: string;

  @ApiProperty({ example: '5000', description: 'Quota in MB' })
  @IsOptional()
  quota?: number;
}

export class UpdateEmailAccountDto {
  @ApiProperty({ example: 'NewPass123!' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ example: '10000' })
  @IsOptional()
  quota?: number;
}

export class CreateForwarderDto {
  @ApiProperty({ example: 'sales@siyezden.com' })
  @IsEmail()
  source: string;

  @ApiProperty({ example: 'admin@siyezden.com' })
  @IsEmail()
  destination: string;
}

export class CreateAutoresponderDto {
  @ApiProperty({ example: 'info@siyezden.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Out of Office' })
  @IsString()
  subject: string;

  @ApiProperty({ example: 'I am currently out of office...' })
  @IsString()
  body: string;

  @ApiProperty({ example: '2025-12-01T00:00:00Z' })
  @IsOptional()
  @IsString()
  startDate?: string;

  @ApiProperty({ example: '2025-12-31T23:59:59Z' })
  @IsOptional()
  @IsString()
  endDate?: string;
}
