export type Role = 'ROOT' | 'ADMIN' | 'RESELLER' | 'USER';
export declare const Permissions: {
    readonly 'domains:create': Role[];
    readonly 'domains:issue-ssl': Role[];
    readonly 'sites:deploy': Role[];
    readonly 'users:list': Role[];
    readonly 'tokens:manage': Role[];
};
export type PermissionKey = keyof typeof Permissions;
//# sourceMappingURL=rbac.d.ts.map