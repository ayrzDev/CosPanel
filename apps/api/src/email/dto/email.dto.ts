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

export class UpdateForwarderDto {
  @ApiProperty({ example: 'sales@siyezden.com', required: false })
  @IsOptional()
  @IsEmail()
  source?: string;

  @ApiProperty({ example: 'admin@siyezden.com', required: false })
  @IsOptional()
  @IsEmail()
  destination?: string;
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

export class CreateMailingListDto {
  @ApiProperty({ example: 'newsletter@site.local' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Weekly Newsletter' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'Monthly updates and news' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class AddMailingListMemberDto {
  @ApiProperty({ example: 'subscriber@example.com' })
  @IsEmail()
  email: string;
}

export class CreateDomainAliasDto {
  @ApiProperty({ example: 'www.example.com' })
  @IsString()
  alias: string;
}

export class UpdateBoxTrapperDto {
  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ example: ['allowed@site.local'], required: false })
  @IsOptional()
  condition?: any;
}

export class DefaultAddressDto {
  @ApiProperty({ example: 'forward', description: 'Action: forward|discard|fail' })
  @IsString()
  action: string;

  @ApiProperty({ example: 'admin@siyezden.com', required: false })
  @IsOptional()
  @IsEmail()
  forwardTo?: string;
}

export class CreateEmailFilterDto {
  @ApiProperty({ example: 'Newsletter Filter' })
  @IsString()
  name: string;

  @ApiProperty({ example: '{"field":"subject","operator":"contains","value":"newsletter"}', description: 'JSON condition' })
  @IsString()
  condition: string;

  @ApiProperty({ example: '{"type":"move","value":"Newsletters"}', description: 'JSON action' })
  @IsString()
  action: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  order?: number;
}

export class UpdateSpamFilterDto {
  @ApiProperty({ example: 5.0 })
  @IsOptional()
  spamScore?: number;

  @ApiProperty({ example: true })
  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;

  @ApiProperty({ example: ['safe@example.com'] })
  @IsOptional()
  whitelist?: string[];

  @ApiProperty({ example: ['spam@example.com'] })
  @IsOptional()
  blacklist?: string[];
}
