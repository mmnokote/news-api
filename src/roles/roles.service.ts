import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto, permissions: any): Promise<Role> {
    const newPost = await this.rolesRepository.create({
      ...createRoleDto,
      permissions,
    });
    await this.rolesRepository.save(newPost);
    return newPost;
  }

  async findRoles(user: any): Promise<any> {
    // const questions = await this.rolesRepository.find({
    //   relations: ['permissions'],
    // });

    return this.rolesRepository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
