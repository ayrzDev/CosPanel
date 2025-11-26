export type Plan = 'BASIC' | 'PRO' | 'AGENCY';
export type SSLStatus = 'NONE' | 'PENDING' | 'ACTIVE' | 'ERROR';
export type Framework = 'next' | 'node' | 'static';
export type JobStatus = 'QUEUED' | 'RUNNING' | 'FAILED' | 'COMPLETED';
export type BackupScope = 'db' | 'files' | 'full';
export interface User {
    id: string;
    email: string;
    passwordHash: string;
    twoFASecret?: string | null;
    role: 'ROOT' | 'ADMIN' | 'RESELLER' | 'USER';
    createdAt: string;
}
export interface Account {
    id: string;
    ownerId: string;
    plan: Plan;
    status: string;
    createdAt: string;
}
export interface Domain {
    id: string;
    accountId: string;
    fqdn: string;
    sslStatus: SSLStatus;
    createdAt: string;
}
export interface Site {
    id: string;
    accountId: string;
    name: string;
    framework: Framework;
    repoUrl?: string | null;
    deployBranch?: string | null;
    createdAt: string;
}
export interface Job {
    id: string;
    type: string;
    payload: Record<string, unknown>;
    status: JobStatus;
    error?: string | null;
    createdAt: string;
    finishedAt?: string | null;
}
export interface Backup {
    id: string;
    accountId: string;
    scope: BackupScope;
    location: string;
    status: JobStatus | 'PENDING';
    createdAt: string;
}
export interface Metric {
    id: string;
    key: string;
    value: number;
    ts: string;
}
export interface ApiToken {
    id: string;
    userId: string;
    name: string;
    hash: string;
    expiresAt?: string | null;
    lastUsedAt?: string | null;
}
//# sourceMappingURL=models.d.ts.map