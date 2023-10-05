import { Injectable } from '@nestjs/common';
import { CreateUserMenuDto } from './dto/create-user-menu.dto';
import { UpdateUserMenuDto } from './dto/update-user-menu.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Menu } from 'src/menus/entities/menu.entity';

@Injectable()
export class UserMenusService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}

  create(createUserMenuDto: CreateUserMenuDto) {
    return 'This action adds a new userMenu';
  }

  findAll() {
    return `This action returns all userMenus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userMenu`;
  }

  update(id: number, updateUserMenuDto: UpdateUserMenuDto) {
    return `This action updates a #${id} userMenu`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMenu`;
  }

  async assignMenuToUser(userId: number, menusId: number[]): Promise<User> {
    const user = await this.userRepository.findOne(userId);
    const menus = await this.menuRepository.findByIds(menusId);
    user.menus = menus;
    return this.userRepository.save(user);
  }
}
