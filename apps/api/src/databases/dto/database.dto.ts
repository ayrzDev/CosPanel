import { IsString, IsOptional, IsNumber, Min, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDatabaseDto {
  @ApiProperty({ example: 'umixpanel_db' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'MYSQL', enum: ['MYSQL', 'POSTGRESQL'] })
  @IsEnum(['MYSQL', 'POSTGRESQL'])
  @IsOptional()
  type?: 'MYSQL' | 'POSTGRESQL';

  @ApiProperty({ example: 'dbuser' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  password: string;
}

export class CreateDatabaseUserDto {
  @ApiProperty({ example: 'umixpanel_user' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'SecurePass123!' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'localhost' })
  @IsString()
  @IsOptional()
  host?: string;
}

export class GrantPrivilegesDto {
  @ApiProperty({ example: 'user_id' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'database_id' })
  @IsString()
  databaseId: string;

  @ApiProperty({ example: ['ALL'] })
  @IsString({ each: true })
  privileges: string[];
}
