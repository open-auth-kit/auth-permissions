export interface PermissionsProvider {
  getPermissions(userId: string): Promise<string[]>;
}

export const PERMISSIONS_PROVIDER = 'PERMISSIONS_PROVIDER';
