import { PartialType } from '@nestjs/swagger';
import { CreateRoomCategoryDto } from './create-room-category.dto';

export class UpdateRoomCategoryDto extends PartialType(CreateRoomCategoryDto) {}
