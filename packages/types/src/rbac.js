"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
exports.Permissions = {
    'domains:create': ['ADMIN', 'RESELLER', 'USER'],
    'domains:issue-ssl': ['ADMIN', 'RESELLER'],
    'sites:deploy': ['USER', 'ADMIN', 'RESELLER', 'ROOT'],
    'users:list': ['ADMIN', 'ROOT'],
    'tokens:manage': ['USER', 'ADMIN', 'RESELLER', 'ROOT']
};
