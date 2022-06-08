import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/users/entities/user.entity';
import { Permission } from './entities/role.enam';
import { RolesService } from './roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  datax = [];

  constructor(
    private reflector: Reflector,
    private readonly rolesService: RolesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermisions = this.reflector.getAllAndOverride<Permission[]>(
      'permissions',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermisions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    this.rolesService.findRoles(request?.user).then((data) => {
      this.datax = data.map(function (item) {
        return item['name'];
      });
      console.log('dax', this.datax);
    });
    console.log('required', requiredPermisions);

    return requiredPermisions.some((role) => this.datax.includes(role));
    console.log('dax', this.datax);
  }
}
