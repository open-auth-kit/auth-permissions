import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY, Permission } from '../decorators/permissions.decorator';
import {
  PERMISSIONS_PROVIDER,
  PermissionsProvider,
} from '../interfaces/permissions-provider.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(PERMISSIONS_PROVIDER) private readonly permissionsService: PermissionsProvider,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.get<Permission[]>(PERMISSIONS_KEY, context.getHandler()) || [];
    if (!required.length) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      return false;
    }
    const userPermissions = await this.permissionsService.getPermissions(user.id);
    return required.every((perm) => userPermissions.includes(perm));
  }
}
