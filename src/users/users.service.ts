import { Injectable, NotFoundException } from '@nestjs/common';
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
    const randomNumber = Math.floor(Math.random() * 9000) + 1000; // Generates a 4-digit random number

    createUserDto.user_identification = 'MS' + randomNumber;
    return this.usersRepository.save(createUserDto);
  }

  async findAll() {
    const users = this.usersRepository.find();
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

  async searchOne(data: string) {
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.first_name ILIKE :data', { data: `%${data}%` })
      .orWhere('user.last_name ILIKE :data', { data: `%${data}%` })
      .orWhere('user.middle_name ILIKE :data', { data: `%${data}%` })
      .orWhere('user.email ILIKE :data', { data: `%${data}%` })
      .getMany();
  }

  async seachOneByID(data: any) {
    // console.log('dataz', data);
    console.log('dataz', data);
    const user = this.usersRepository
      .createQueryBuilder('user')
      .where('user.user_identification = :data', { data: data })
      .getMany();
    if ((await user).length > 0) {
      return user;
    } else {
      throw new NotFoundException();
    }

    // return this.usersRepository.findOne(id);
  }

  async findOneUser(username: string): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      username,
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto);
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
