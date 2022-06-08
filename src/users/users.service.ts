import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
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
    private eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('user.created')
  handleOrderCreatedEvent(payload: any) {
    console.log('dataxxxxxxx', payload);
  }

  async create(createUserDto: CreateUserDto, roles: any) {
    const newUser = await this.usersRepository.create({
      ...createUserDto,
      roles,
    });
    await this.usersRepository
      .save(newUser)
      .then((response) => {
        if (response) {
          this.eventEmitter.emit('user.created', response);

          return response;
        }
      })
      .catch((error) => {
        return error;

        // throw new InternalServerErrorException();
      });
    return newUser;
  }

  async findAll() {
    const users = this.usersRepository.createQueryBuilder('user').getMany();
    return users;
  }

  async findOne(id: number) {
    return this.usersRepository.findOne(id);
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
