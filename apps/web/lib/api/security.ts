import { apiClient } from '../api-client';

export interface SSLCertificate {
  id: string;
  domainId: string;
  issuer: string;
  expiresAt: Date;
  status: 'PENDING' | 'ACTIVE' | 'EXPIRED';
  createdAt: Date;
}

export interface InstallSSLDto {
  domainId: string;
  certificate: string;
  privateKey: string;
  caBundle?: string;
}

export interface GenerateCSRDto {
  commonName: string;
  country: string;
  state: string;
  locality: string;
  organization: string;
  organizationalUnit?: string;
  email: string;
}

export interface BlockedIP {
  id: string;
  ipAddress: string;
  reason: string;
  expiresAt?: Date;
  createdAt: Date;
}

export interface BlockIPDto {
  ipAddress: string;
  reason: string;
  expiresAt?: Date;
}

export interface FirewallRule {
  id: string;
  name: string;
  rule: string;
  enabled: boolean;
  triggeredCount: number;
  createdAt: Date;
}

export interface CreateFirewallRuleDto {
  name: string;
  rule: string;
  enabled: boolean;
}

export interface UpdateFirewallRuleDto {
  enabled: boolean;
}

export const securityApi = {
  // SSL Certificates
  getAllSSL: async (): Promise<SSLCertificate[]> => {
    const { data } = await apiClient.get('/security/ssl');
    return data;
  },

  installSSL: async (dto: InstallSSLDto): Promise<SSLCertificate> => {
    const { data } = await apiClient.post('/security/ssl/install', dto);
    return data;
  },

  generateCSR: async (dto: GenerateCSRDto): Promise<{ csr: string; privateKey: string }> => {
    const { data } = await apiClient.post('/security/ssl/generate-csr', dto);
    return data;
  },

  deleteSSL: async (id: string): Promise<void> => {
    await apiClient.delete(`/security/ssl/${id}`);
  },

  // IP Blocker
  getBlockedIPs: async (): Promise<BlockedIP[]> => {
    const { data } = await apiClient.get('/security/blocked-ips');
    return data;
  },

  blockIP: async (dto: BlockIPDto): Promise<BlockedIP> => {
    const { data } = await apiClient.post('/security/block-ip', dto);
    return data;
  },

  unblockIP: async (id: string): Promise<void> => {
    await apiClient.delete(`/security/blocked-ips/${id}`);
  },

  // Firewall Rules (ModSecurity)
  getFirewallRules: async (): Promise<FirewallRule[]> => {
    const { data } = await apiClient.get('/security/firewall/rules');
    return data;
  },

  createFirewallRule: async (dto: CreateFirewallRuleDto): Promise<FirewallRule> => {
    const { data } = await apiClient.post('/security/firewall/rules', dto);
    return data;
  },

  toggleFirewallRule: async (id: string, dto: UpdateFirewallRuleDto): Promise<FirewallRule> => {
    const { data } = await apiClient.put(`/security/firewall/rules/${id}/toggle`, dto);
    return data;
  },

  deleteFirewallRule: async (id: string): Promise<void> => {
    await apiClient.delete(`/security/firewall/rules/${id}`);
  },
};
