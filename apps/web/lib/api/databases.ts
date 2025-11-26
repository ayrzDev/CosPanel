import apiClient from '../api-client';

export interface Database {
  id: string;
  name: string;
  size: number;
  tables: number;
  createdAt: string;
}

export interface DatabaseUser {
  id: string;
  username: string;
  createdAt: string;
}

export interface CreateDatabaseDto {
  name: string;
  accountId: string;
}

export interface CreateDatabaseUserDto {
  username: string;
  password: string;
}

export interface GrantPrivilegesDto {
  userId: string;
  databaseId: string;
  privileges: string[];
}

export const databasesApi = {
  // Databases
  getAll: async (): Promise<Database[]> => {
    const { data } = await apiClient.get('/databases');
    return data;
  },

  getOne: async (id: string): Promise<Database> => {
    const { data } = await apiClient.get(`/databases/${id}`);
    return data;
  },

  create: async (dto: CreateDatabaseDto): Promise<Database> => {
    const { data } = await apiClient.post('/databases', dto);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/databases/${id}`);
  },

  // Users
  getAllUsers: async (): Promise<DatabaseUser[]> => {
    const { data } = await apiClient.get('/databases/users/all');
    return data;
  },

  createUser: async (dto: CreateDatabaseUserDto): Promise<DatabaseUser> => {
    const { data } = await apiClient.post('/databases/users', dto);
    return data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await apiClient.delete(`/databases/users/${id}`);
  },

  // Privileges
  grantPrivileges: async (dto: GrantPrivilegesDto): Promise<any> => {
    const { data } = await apiClient.post('/databases/privileges', dto);
    return data;
  },

  getPrivileges: async (userId: string, databaseId: string): Promise<any> => {
    const { data } = await apiClient.get(`/databases/privileges/${userId}/${databaseId}`);
    return data;
  },
};
