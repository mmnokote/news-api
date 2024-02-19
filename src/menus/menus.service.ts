import { Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenusService {
  constructor(
    @InjectRepository(Menu)
    private menusRepository: Repository<Menu>,
  ) {}

  async create(createmenuDto: CreateMenuDto) {
    // console.log(createmenuDto);
    return this.menusRepository.save(createmenuDto);
  }

  findAll() {
    const menus = this.menusRepository.createQueryBuilder('menu').getMany();
    return menus;
  }

  findOne(id: number) {
    return this.menusRepository.findOne(id);
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return this.menusRepository.update(id, updateMenuDto);
  }

  remove(id: number) {
    return this.menusRepository.delete(id);
  }
}
