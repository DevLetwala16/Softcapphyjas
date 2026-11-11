import { APP_CONFIG, type UserRole } from "@softcapphyjas/config";

export function hasPermission(role: UserRole, requiredRole: UserRole): boolean {
  const roleHierarchy: Record<UserRole, number> = {
    [APP_CONFIG.roles.STUDENT]: 1,
    [APP_CONFIG.roles.CLIENT]: 1,
    [APP_CONFIG.roles.RESEARCHER]: 2,
    [APP_CONFIG.roles.STAFF]: 3,
    [APP_CONFIG.roles.ADMIN]: 4,
    [APP_CONFIG.roles.SUPER_ADMIN]: 5,
  };

  return (roleHierarchy[role] ?? 0) >= (roleHierarchy[requiredRole] ?? 0);
}
