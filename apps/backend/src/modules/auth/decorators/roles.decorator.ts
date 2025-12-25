import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../../entities/user.entity';

export const ROLES_KEY = 'roles';

/**
 * Roles Decorator
 * 
 * Define which roles can access a route.
 * Use with RolesGuard for role-based access control.
 * 
 * @example
 * @Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
 * @UseGuards(JwtAuthGuard, RolesGuard)
 * @Get('admin-only')
 * adminOnlyRoute() {
 *   return { message: 'Admin access granted' };
 * }
 */
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

