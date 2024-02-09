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

    createUserDto.user_identification = 'CFN' + randomNumber;
    return this.usersRepository.save(createUserDto);
  }
  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }
  async findAll() {
    const users = this.usersRepository.find();
    return users;
  }

  async findOne(id: number) {
    return this.usersRepository.findOne(id);
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

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //   console.log('updateUserDto', updateUserDto);
  //   return this.usersRepository.update(id, updateUserDto);
  // }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Log the received updateUserDto to the console for debugging purposes
    console.log('updateUserDto', updateUserDto);

    // Update the user with the specified id using the data provided in updateUserDto
    const updateResult = await this.usersRepository.update(id, updateUserDto);

    // If the update was successful and the user exists, fetch and return the updated user
    if (updateResult) {
      const updatedUser = await this.usersRepository.findOne(id); // Assuming findOne is used to fetch a single user
      return updatedUser;
    }

    // If the update failed or the user does not exist, return null or throw an error
    return null; // or throw new Error('User not found or update failed');
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
