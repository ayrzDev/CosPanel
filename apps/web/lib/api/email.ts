import apiClient from '../api-client';

export interface EmailAccount {
  id: string;
  email: string;
  quota: number;
  used: number;
  createdAt: string;
}

export interface CreateEmailAccountDto {
  email: string;
  password: string;
  quota?: number;
}

export interface UpdateEmailAccountDto {
  password?: string;
  quota?: number;
}

export interface Forwarder {
  id: string;
  source: string;
  destination: string;
  createdAt: string;
}

export interface CreateForwarderDto {
  source: string;
  destination: string;
}

export interface Autoresponder {
  id: string;
  email: string;
  subject: string;
  body: string;
  startDate?: string;
  endDate?: string;
  enabled: boolean;
  createdAt: string;
}

export interface CreateAutoresponderDto {
  email: string;
  subject: string;
  body: string;
  startDate?: string;
  endDate?: string;
}

// Email Accounts
export const emailApi = {
  // Accounts
  getAccounts: async (accountId?: string): Promise<EmailAccount[]> => {
    const { data } = await apiClient.get('/email/accounts', {
      params: { accountId },
    });
    return data;
  },

  getAccount: async (id: string): Promise<EmailAccount> => {
    const { data } = await apiClient.get(`/email/accounts/${id}`);
    return data;
  },

  createAccount: async (dto: CreateEmailAccountDto): Promise<EmailAccount> => {
    const { data } = await apiClient.post('/email/accounts', dto);
    return data;
  },

  updateAccount: async (id: string, dto: UpdateEmailAccountDto): Promise<EmailAccount> => {
    const { data } = await apiClient.put(`/email/accounts/${id}`, dto);
    return data;
  },

  deleteAccount: async (id: string): Promise<void> => {
    await apiClient.delete(`/email/accounts/${id}`);
  },

  // Forwarders
  getForwarders: async (): Promise<Forwarder[]> => {
    const { data} = await apiClient.get('/email/forwarders');
    return data;
  },

  createForwarder: async (dto: CreateForwarderDto): Promise<Forwarder> => {
    const { data } = await apiClient.post('/email/forwarders', dto);
    return data;
  },

  deleteForwarder: async (id: string): Promise<void> => {
    await apiClient.delete(`/email/forwarders/${id}`);
  },

  // Autoresponders
  getAutoresponders: async (): Promise<Autoresponder[]> => {
    const { data } = await apiClient.get('/email/autoresponders');
    return data;
  },

  createAutoresponder: async (dto: CreateAutoresponderDto): Promise<Autoresponder> => {
    const { data } = await apiClient.post('/email/autoresponders', dto);
    return data;
  },

  deleteAutoresponder: async (id: string): Promise<void> => {
    await apiClient.delete(`/email/autoresponders/${id}`);
  },
};
