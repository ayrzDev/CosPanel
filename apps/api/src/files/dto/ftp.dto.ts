import { IsString, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFtpDto {
  @ApiProperty({ example: 'user@domain.com' })
  @IsString()
  username: string;

  @ApiProperty({ example: '/home/user/public_html' })
  @IsString()
  directory: string;

  @ApiProperty({ example: '1024' })
  @IsOptional()
  @IsString()
  quota?: string;

  @ApiProperty({ example: 'secretPassword' })
  @IsOptional()
  @IsString()
  password?: string;
}

export class UpdateFtpDto {
  @ApiProperty({ example: '/home/user/new_dir' })
  @IsOptional()
  @IsString()
  directory?: string;

  @ApiProperty({ example: '2048' })
  @IsOptional()
  @IsString()
  quota?: string;

  @ApiProperty({ example: 'newSecret' })
  @IsOptional()
  @IsString()
  password?: string;
}
