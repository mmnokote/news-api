import { Module } from '@nestjs/common';
import { UserMenusService } from './user-menus.service';
import { UserMenusController } from './user-menus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { UsersModule } from 'src/users/users.module';
import { MenusModule } from 'src/menus/menus.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Menu]), UsersModule, MenusModule],
  controllers: [UserMenusController],
  providers: [UserMenusService],
})
export class UserMenusModule {}
