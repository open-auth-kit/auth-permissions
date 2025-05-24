# Auth Permissions

This package provides an RBAC permissions guard for NestJS. It is intended to be used together with the JWT plugin from `@open-auth-kit`.

## Installation

```bash
pnpm add @open-auth-kit/auth-permissions
```

## Usage

1. Register `PermissionsModule` and supply a provider for `PERMISSIONS_PROVIDER`.
2. Use the `@Permissions()` decorator on endpoints to specify required permissions.
3. Apply `PermissionsGuard` in controllers or globally.

```ts
import {
  Permissions,
  PermissionsModule,
  PermissionsGuard,
  PERMISSIONS_PROVIDER,
  PermissionsProvider,
} from '@open-auth-kit/auth-permissions';

@Module({
  imports: [
    PermissionsModule.register({
      provide: PERMISSIONS_PROVIDER,
      useClass: MyPermissionsService,
    }),
  ],
})
export class AppModule {}
```

Implement `PermissionsProvider` in `MyPermissionsService` to fetch permissions for your users.
