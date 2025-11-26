import { apiClient } from '../api-client';

export interface FileItem {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size: number;
  permissions: string;
  owner: string;
  modified: Date;
}

export interface CreateFileDto {
  path: string;
  content: string;
}

export interface UpdateFileDto {
  path: string;
  content: string;
}

export interface DeleteFileDto {
  path: string;
}

export interface CreateDirectoryDto {
  path: string;
}

export interface SetPermissionsDto {
  path: string;
  permissions: string;
}

export interface CompressDto {
  paths: string[];
  outputPath: string;
  format: 'zip' | 'tar' | 'tar.gz';
}

export interface ExtractDto {
  archivePath: string;
  destination: string;
}

export interface DiskUsage {
  total: number;
  used: number;
  free: number;
  usedPercentage: number;
}

export const filesApi = {
  list: async (path: string = '/'): Promise<FileItem[]> => {
    const { data } = await apiClient.get('/files/list', { params: { path } });
    return data;
  },

  get: async (path: string): Promise<{ content: string }> => {
    const { data } = await apiClient.get('/files/get', { params: { path } });
    return data;
  },

  create: async (dto: CreateFileDto): Promise<void> => {
    await apiClient.post('/files/create', dto);
  },

  update: async (dto: UpdateFileDto): Promise<void> => {
    await apiClient.put('/files/update', dto);
  },

  delete: async (dto: DeleteFileDto): Promise<void> => {
    await apiClient.delete('/files/delete', { data: dto });
  },

  createDirectory: async (dto: CreateDirectoryDto): Promise<void> => {
    await apiClient.post('/files/directory', dto);
  },

  setPermissions: async (dto: SetPermissionsDto): Promise<void> => {
    await apiClient.put('/files/permissions', dto);
  },

  compress: async (dto: CompressDto): Promise<{ path: string }> => {
    const { data } = await apiClient.post('/files/compress', dto);
    return data;
  },

  extract: async (dto: ExtractDto): Promise<void> => {
    await apiClient.post('/files/extract', dto);
  },

  getDiskUsage: async (): Promise<DiskUsage> => {
    const { data } = await apiClient.get('/files/disk-usage');
    return data;
  },
};
