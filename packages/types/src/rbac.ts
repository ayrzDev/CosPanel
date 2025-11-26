export type Role = 'ROOT' | 'ADMIN' | 'RESELLER' | 'USER';

export const Permissions = {
  'domains:create': ['ADMIN', 'RESELLER', 'USER'] as Role[],
  'domains:issue-ssl': ['ADMIN', 'RESELLER'] as Role[],
  'sites:deploy': ['USER', 'ADMIN', 'RESELLER', 'ROOT'] as Role[],
  'users:list': ['ADMIN', 'ROOT'] as Role[],
  'tokens:manage': ['USER', 'ADMIN', 'RESELLER', 'ROOT'] as Role[]
} as const;

export type PermissionKey = keyof typeof Permissions;
