import apiClient from '../api-client';

export interface Domain {
  id: string;
  fqdn: string;
  sslStatus: 'NONE' | 'PENDING' | 'ACTIVE' | 'ERROR';
  createdAt: string;
}

export interface CreateDomainDto {
  fqdn: string;
  accountId: string;
}

export interface UpdateSSLDto {
  sslStatus: 'NONE' | 'PENDING' | 'ACTIVE' | 'ERROR';
}

export const domainsApi = {
  getAll: async (accountId?: string): Promise<Domain[]> => {
    const { data } = await apiClient.get('/domains', {
      params: { accountId },
    });
    return data;
  },

  getOne: async (id: string): Promise<Domain> => {
    const { data } = await apiClient.get(`/domains/${id}`);
    return data;
  },

  create: async (dto: CreateDomainDto): Promise<Domain> => {
    const { data } = await apiClient.post('/domains', dto);
    return data;
  },

  updateSSL: async (id: string, dto: UpdateSSLDto): Promise<Domain> => {
    const { data } = await apiClient.put(`/domains/${id}/ssl`, dto);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/domains/${id}`);
  },
};
