import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import type { PermissionKey, Role } from '@umixpanel/types';
import { Permissions } from '@umixpanel/types';

@Injectable()
export class RbacGuard implements CanActivate {
  constructor(private readonly required: PermissionKey | PermissionKey[]) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user as { role: Role } | undefined;
    if (!user) throw new ForbiddenException('No user context');
    const required = Array.isArray(this.required) ? this.required : [this.required];
    for (const perm of required) {
      const allowed = Permissions[perm];
      if (allowed?.includes(user.role)) return true;
    }
    throw new ForbiddenException('Insufficient permissions');
  }
}
