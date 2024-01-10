import { Injectable } from '@nestjs/common';
import { CreateSubthemeDto } from './dto/create-subtheme.dto';
import { UpdateSubthemeDto } from './dto/update-subtheme.dto';

@Injectable()
export class SubthemesService {
  create(createSubthemeDto: CreateSubthemeDto) {
    return 'This action adds a new subtheme';
  }

  findAll() {
    return `This action returns all subthemes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subtheme`;
  }

  update(id: number, updateSubthemeDto: UpdateSubthemeDto) {
    return `This action updates a #${id} subtheme`;
  }

  remove(id: number) {
    return `This action removes a #${id} subtheme`;
  }
}
