import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoomCategoriesService } from './room-categories.service';
import { CreateRoomCategoryDto } from './dto/create-room-category.dto';
import { UpdateRoomCategoryDto } from './dto/update-room-category.dto';

@Controller('room-categories')
export class RoomCategoriesController {
  constructor(private readonly roomCategoriesService: RoomCategoriesService) {}

  @Post()
  create(@Body() createRoomCategoryDto: CreateRoomCategoryDto) {
    return this.roomCategoriesService.create(createRoomCategoryDto);
  }

  @Get()
  findAll() {
    return this.roomCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomCategoryDto: UpdateRoomCategoryDto) {
    return this.roomCategoriesService.update(+id, updateRoomCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomCategoriesService.remove(+id);
  }
}
