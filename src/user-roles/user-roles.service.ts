import { Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Menu } from 'src/menus/entities/menu.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Menu)
    private menuRepository: Repository<Menu>,
  ) {}
  create(createUserRoleDto: CreateUserRoleDto) {
    return 'This action adds a new userRole';
  }

  findAll() {
    return `This action returns all userRoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userRole`;
  }

  update(id: number, updateUserRoleDto: UpdateUserRoleDto) {
    return `This action updates a #${id} userRole`;
  }

  remove(id: number) {
    return `This action removes a #${id} userRole`;
  }

  async assignMenuToUser(
    userId: number,
    roleId: number[],
    menuId: number[],
  ): Promise<User> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['roles'],
    });
    console.log(user);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const roles = await this.roleRepository.findByIds(roleId);
    const menus = await this.menuRepository.findByIds(menuId);
    if (!roles || roles.length === 0) {
      throw new Error(`No roles found with IDs ${roleId.join(', ')}`);
    }
    if (!menus || roles.length === 0) {
      throw new Error(`No menus found with IDs ${roleId.join(', ')}`);
    }

    user.roles = roles;
    user.menus = menus;
    return this.userRepository.save(user);
  }
}
