import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService
      .create(createUserDto)
      .then((response) => {
        if (response) {
          return response;
        } else {
          throw new NotFoundException();
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error.code === '23505') {
          throw new ConflictException(error.detail);
        }
        throw new InternalServerErrorException();
      });
  }

  @Get()
  findAll() {
    return this.usersService
      .findAll()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new NotFoundException(error.detail);
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService
      .findOne(+id)
      .then((response) => {
        if (response) {
          return response;
        } else {
          throw new InternalServerErrorException();
        }
      })
      .catch((error) => {
        throw new NotFoundException(error.detail);
      });
  }
  @Get(':username')
  findOneUser(@Param('username') username: string) {
    return this.usersService
      .findOne(+username)
      .then((response) => {
        if (response) {
          return response;
        } else {
          throw new InternalServerErrorException();
        }
      })
      .catch((error) => {
        throw new NotFoundException(error.detail);
      });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
