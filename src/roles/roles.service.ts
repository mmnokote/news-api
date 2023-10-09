import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  findAll() {
    const roles = this.roleRepository.createQueryBuilder('role').getMany();
    return roles;

    // const id = 3;
    // return this.roleRepository
    //   .createQueryBuilder('role')
    //   .leftJoinAndSelect('role.reader', 'reader')
    //   .where('reader.id = :readerId', { readerId: id })
    //   .getMany();
  }

  findOne(id: number) {
    return this.roleRepository.findOne(id);
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return this.roleRepository.update(id, updateRoleDto);
  }

  remove(id: number) {
    return this.roleRepository.delete(id);
  }
}
