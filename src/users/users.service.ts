import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
// import { Op } from 'sequelize';

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
      if (error) {
        return {
          user: null,
          message: 'Applicant already exists. Login to your account to proceed',
        };
      }
      // Re-throw the error if it's not a duplicate entry error
      throw error;
    }
  }

  async verifyQR(
    dataDto: any,
  ): Promise<{ user: User | null; message: string }> {
    try {
      // Find the user
      const newUser = await this.usersRepository.findOne({
        user_identification: dataDto.id,
        verified: false,
        active: true,
      });
      const newUserWhoVerified = await this.usersRepository.findOne({
        user_identification: dataDto.id,
        verified: true,
        active: true,
      });
      const newUserWithReceipt = await this.usersRepository.findOne({
        user_identification: dataDto.id,
        verified: false,
        active: false,
      });
      if (newUserWhoVerified) {
        return {
          user: newUserWhoVerified,
          message: 'Applicant already Verified',
        };
      } else if (newUser) {
        return { user: newUser, message: 'Applicant retrieved successfully' };
      } else if (newUserWithReceipt) {
        return { user: newUserWithReceipt, message: 'UnActivated Applicant' };
      } else {
        return { user: null, message: 'No Applicant with this QR Code' };
      }
    } catch (error) {
      if (error) {
        return {
          user: null,
          message: error,
        };
      }
      // Re-throw the error if it's not a duplicate entry error
      throw error;
    }
  }

  async create2(
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
      throw new Error('Failed to create Applicant');
    }
  }

  // async findByUsernamex(
  //   username: string,
  //   phone_number: string,
  // ): Promise<User | undefined> {
  //   return this.usersRepository.findOne({
  //     where: {
  //       [Op.or]: [{ username }, { phone_number }],
  //     },
  //   });
  // }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  // async findAll() {
  //   const users = this.usersRepository.find();
  //   return users;
  // }
  async findAll() {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.jisajilis', 'jisajili')
      .leftJoinAndSelect('user.country', 'country')
      .leftJoinAndSelect('user.registationcategory', 'registrationCategory')
      .orderBy('jisajili.id', 'ASC')
      // .orderBy('user.active', 'DESC')
      .getMany();
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
      .leftJoinAndSelect('user.jisajilis', 'jisajili')
      .leftJoinAndSelect('user.country', 'country')
      .leftJoinAndSelect('user.registationcategory', 'registrationCategory')
      .where('user.first_name ILIKE :data', { data: `%${data}%` })
      .orWhere('user.last_name ILIKE :data', { data: `%${data}%` })
      .orWhere('user.middle_name ILIKE :data', { data: `%${data}%` })
      .orWhere('user.phone_number ILIKE :data', { data: `%${data}%` })
      .orWhere('user.email ILIKE :data', { data: `%${data}%` })
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
          return { updatedUser, message: 'Applicant updated successfully' };
        }
      }

      // If the user does not exist, return null
      return {
        updatedUser: null,
        message: 'Applicant not found or update failed',
      };
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
