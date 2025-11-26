export interface LoginDto {
  email: string;
  password: string;
  twoFactorCode?: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface CreateDomainDto {
  accountId: string;
  fqdn: string;
}

export interface IssueSslDto {
  domainId: string;
}

export interface CreateSiteDto {
  name: string;
  framework: 'next' | 'node' | 'static';
  repoUrl?: string;
  deployBranch?: string;
}

export interface CreateBackupDto {
  accountId: string;
  scope: 'db' | 'files' | 'full';
}

export interface DeployDto {
  siteId: string;
  repoUrl: string;
  branch: string;
}
