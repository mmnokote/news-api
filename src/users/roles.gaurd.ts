import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './entities/role.enum';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from './users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requreRoles = this.reflector.getAllAndOverride<any[]>('roles', [
      context.getHandler(),
      context.getClass,
    ]);

    if (!requreRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest();
    // const { user } = context.switchToHttp().getRequest();
    const token = user.rawHeaders[11]?.replace('Bearer ', '');
    const decoded = await this.authService.verifyToken(token);
    const user1 = await this.userService.findOne(decoded.sub);
    const roleNames = user1.roles.map((role) => role.name);

    return requreRoles.some((role) => roleNames.includes(role));
  }
}
