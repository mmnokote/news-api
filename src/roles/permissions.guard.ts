import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from 'src/permissions/permissions.service';
import { User } from 'src/users/entities/user.entity';
import { Permission } from './entities/role.enam';
import { RolesService } from './roles.service';

@Injectable()
export class RolesGuard implements CanActivate {
  dataRoleids: any = [];
  dataPermissions: any = [];

  constructor(
    private reflector: Reflector,
    private readonly rolesService: RolesService, // private readonly permissionService: PermissionsService,
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
      if (data) {
        this.dataRoleids = data.map((role) => role.name);
      }
    });
    // this.permissionService.findPermission(this.dataRoleids).then((data) => {
    //   if (data) {
    //     this.dataPermissions = data.map((permi) => permi.id);
    //   }
    // });
    // const request = context.switchToHttp().getRequest();
    // this.rolesService.findRoles(request?.user).then((data) => {
    //   if (data) {
    //     this.dataRoleids = data.map((role) => role.id);
    //   }
    // });
    console.log('dax', this.dataRoleids);

    console.log('required', requiredPermisions);

    return requiredPermisions.some((role) => this.dataRoleids.includes(role));
  }
}
