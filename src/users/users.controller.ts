import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Request,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { PermissionsPost } from 'src/roles/permissions.decoretor';
import { Permission } from 'src/roles/entities/role.enam';
import { RolesGuard } from 'src/roles/permissions.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @PermissionsPost(Permission.USERGET)
  create(@Body() createUserDto: CreateUserDto) {
    const roles = createUserDto.roles;
    if (!roles) {
      throw new NotFoundException(`Roles not found.`);
    }
    const data = {
      ...createUserDto,
      roles,
    };

    return this.usersService
      .create(createUserDto, roles)
      .then((response) => {
        if (response) {
          return response;
        } else {
          throw new NotFoundException();
        }
      })
      .catch((error) => {
        // console.log('ressssssssssssssssss', error);
        if (error.code === '23505') {
          throw new ConflictException(error.detail);
        }
        throw new InternalServerErrorException();
      });
  }

  @Get()
  @PermissionsPost(Permission.USERPOST)
  findAll(@Request() req) {
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
