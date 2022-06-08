import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Permission } from './entities/role.enam';
import { PermissionsPost } from './permissions.decoretor';
import { ClientProxy } from '@nestjs/microservices';

@Controller('roles')
export class RolesController {
  constructor(
    private readonly rolesService: RolesService,
    @Inject('ROLE_SERVICE') private readonly booksClient: ClientProxy,
  ) {}

  @Post()
  @PermissionsPost(Permission.POST)
  create(@Body() createRoleDto: CreateRoleDto) {
    const permissions = createRoleDto.permissions;
    if (!permissions) {
      throw new NotFoundException(`Permissions not found.`);
    }
    const data = {
      ...createRoleDto,
      permissions,
    };

    return this.rolesService
      .create(createRoleDto, permissions)
      .then((response) => {
        if (response) {
          this.booksClient.emit(
            'role_created',
            response,
            // new CreateUserEvent(createUserDto.email),
          );
          return response;
        }
      })
      .catch((error) => {
        throw new InternalServerErrorException();
      });
  }

  @Get()
  @PermissionsPost(Permission.GET)
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @PermissionsPost(Permission.DELETE)
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
