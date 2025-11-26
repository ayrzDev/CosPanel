import { IsString, IsOptional, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFileDto {
  @ApiProperty({ example: '/public_html/index.html' })
  @IsString()
  path: string;

  @ApiProperty({ example: '<!DOCTYPE html>...' })
  @IsString()
  content: string;
}

export class UpdateFileDto {
  @ApiProperty({ example: '<!DOCTYPE html>...' })
  @IsString()
  content: string;
}

export class CreateDirectoryDto {
  @ApiProperty({ example: '/public_html/new-folder' })
  @IsString()
  path: string;
}

export class UploadFileDto {
  @ApiProperty({ example: '/public_html/uploads' })
  @IsString()
  destination: string;
}

export class SetPermissionsDto {
  @ApiProperty({ example: '0755' })
  @IsString()
  permissions: string;
}

export class CompressFilesDto {
  @ApiProperty({ example: ['/public_html/file1.txt', '/public_html/file2.txt'] })
  @IsString({ each: true })
  files: string[];

  @ApiProperty({ example: '/public_html/archive.zip' })
  @IsString()
  destination: string;

  @ApiProperty({ example: 'zip', enum: ['zip', 'tar', 'tar.gz'] })
  @IsString()
  format: string;
}
