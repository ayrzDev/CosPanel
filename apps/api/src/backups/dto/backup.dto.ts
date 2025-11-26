import { IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBackupDto {
  @ApiProperty({ example: '00000000-0000-0000-0000-000000000000' })
  @IsString()
  accountId: string;

  @ApiProperty({ example: 'full', enum: ['db', 'files', 'full'] })
  @IsEnum(['db', 'files', 'full'])
  scope: string;

  @ApiProperty({ example: '/backups/backup_2024_12_14.tar.gz' })
  @IsString()
  location: string;
}

export class RestoreBackupDto {
  @ApiProperty({ example: 'backup_id' })
  @IsString()
  backupId: string;

  @ApiProperty({ example: '/public_html' })
  @IsOptional()
  @IsString()
  destination?: string;
}
