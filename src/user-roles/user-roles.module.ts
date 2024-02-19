import { Module } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Menu } from 'src/menus/entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Menu])],
  controllers: [UserRolesController],
  providers: [UserRolesService],
})
export class UserRolesModule {}
