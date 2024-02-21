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

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ user: User; message: string }> {
    try {
      const randomNumber = Math.floor(Math.random() * 9000) + 1000; // Generates a 4-digit random number
      createUserDto.user_identification = 'CFN' + randomNumber;

      // Save the user
      const newUser = await this.usersRepository.save(createUserDto);

      return { user: newUser, message: 'Registration completed successfully' };
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
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
  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<{ updatedUser: User | null; message: string }> {
    try {
      // Remove the jisajilis property from the updateUserDto
      delete updateUserDto.jisajilis;

      // Update the user with the specified id using the modified data in updateUserDto
      const updateResult = await this.usersRepository.update(id, updateUserDto);

      // If the update was successful and the user exists, fetch and return the updated user
      if (updateResult) {
        const updatedUser = await this.usersRepository.findOne(id);
        if (updatedUser) {
          return { updatedUser, message: 'User updated successfully' };
        }
      }

      // If the user does not exist, return null
      return { updatedUser: null, message: 'User not found or update failed' };
    } catch (error) {
      // Handle any errors that occur during the update operation
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async activateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      .where('user.id = :id', { id })
      .getOne();
    // return user;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Toggle the 'active' status
    // user.roles = user.roles;
    user.active = !user.active;
    // Update the user in the database
    return this.usersRepository.save(user);
  }
}
