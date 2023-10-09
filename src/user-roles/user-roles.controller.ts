import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('user-roles')
export class UserRolesController {
  constructor(private readonly userRolesService: UserRolesService) {}

  @Post()
  create() {
    // const userId = 1;
    // const menusId = [3, 4, 5, 6, 7, 8];
    const userId = 1;
    const roleId = [1, 2, 3];
    return this.userRolesService.assignMenuToUser(userId, roleId);
  }

  @Get()
  findAll() {
    return this.userRolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRolesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRolesService.update(+id, updateUserRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userRolesService.remove(+id);
  }
}
