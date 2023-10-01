import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserMenusService } from './user-menus.service';
import { UpdateUserMenuDto } from './dto/update-user-menu.dto';

@Controller('user-menus')
export class UserMenusController {
  constructor(private readonly userMenusService: UserMenusService) {}

  @Post()
  create() {
    // const userId = 1;
    // const menusId = [3, 4, 5, 6, 7, 8];
    const userId = 28;
    const menusId = [7];
    return this.userMenusService.assignMenuToUser(userId, menusId);
  }

  @Get()
  findAll() {
    return this.userMenusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMenusService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserQueryDto: UpdateUserMenuDto,
  ) {
    return this.userMenusService.update(+id, updateUserQueryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMenusService.remove(+id);
  }
}
