import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersRepository.save(createUserDto);
  }

  async findAll() {
    const users = this.usersRepository.find({ relations: ['query'] });
    return users;
  }

  async findOne(id: number) {
    // return this.usersRepository
    //   .createQueryBuilder('user')
    //   .leftJoinAndSelect('user.queries', 'queries')
    //   .where('user.id = :id', { id: id })
    //   .getMany();
    return this.usersRepository.findOne(id, { relations: ['queries'] });
  }

  async seachOne(data: any) {
    console.log('dataz', data);
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.first_name = :data', { data: data })
      .getMany();

    // return this.usersRepository.findOne(id);
  }

  async findOneUser(username: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      username,
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
