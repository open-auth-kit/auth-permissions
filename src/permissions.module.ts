import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { PermissionsGuard } from './guards/permissions.guard';
import { PermissionsProvider } from './interfaces/permissions-provider.interface';

@Global()
@Module({})
export class PermissionsModule {
  static register(service: Provider<PermissionsProvider>): DynamicModule {
    return {
      module: PermissionsModule,
      providers: [service, PermissionsGuard],
      exports: [PermissionsGuard, service],
    };
  }
}
