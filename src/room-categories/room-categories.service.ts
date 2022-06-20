import { Injectable } from '@nestjs/common';
import { CreateRoomCategoryDto } from './dto/create-room-category.dto';
import { UpdateRoomCategoryDto } from './dto/update-room-category.dto';

@Injectable()
export class RoomCategoriesService {
  create(createRoomCategoryDto: CreateRoomCategoryDto) {
    return 'This action adds a new roomCategory';
  }

  findAll() {
    return `This action returns all roomCategories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomCategory`;
  }

  update(id: number, updateRoomCategoryDto: UpdateRoomCategoryDto) {
    return `This action updates a #${id} roomCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomCategory`;
  }
}
