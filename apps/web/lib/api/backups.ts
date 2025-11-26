import { apiClient } from '../api-client';

export interface Backup {
  id: string;
  accountId: string;
  scope: 'db' | 'files' | 'full';
  location: string;
  size: number;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
}

export interface CreateBackupDto {
  accountId: string;
  scope: 'db' | 'files' | 'full';
  location: string;
}

export interface RestoreBackupDto {
  backupId: string;
  destination: string;
}

export interface BackupStats {
  totalBackups: number;
  totalSize: number;
  oldestBackup: Date;
  newestBackup: Date;
}

export const backupsApi = {
  getAll: async (accountId?: string): Promise<Backup[]> => {
    const params = accountId ? { accountId } : undefined;
    const { data } = await apiClient.get('/backups', { params });
    return data;
  },

  getOne: async (id: string): Promise<Backup> => {
    const { data } = await apiClient.get(`/backups/${id}`);
    return data;
  },

  getStats: async (): Promise<BackupStats> => {
    const { data } = await apiClient.get('/backups/stats');
    return data;
  },

  create: async (dto: CreateBackupDto): Promise<Backup> => {
    const { data } = await apiClient.post('/backups', dto);
    return data;
  },

  restore: async (dto: RestoreBackupDto): Promise<void> => {
    await apiClient.post('/backups/restore', dto);
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/backups/${id}`);
  },
};
