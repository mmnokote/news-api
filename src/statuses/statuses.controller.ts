import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Role } from 'src/users/entities/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { StatusesService } from './statuses.service';
// @UseGuards(JwtAuthGuard)
// @Roles(Role.ADMIN)
@Controller('statuses')
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Post()
  create(@Body() createDataDto: CreateStatusDto) {
    return this.statusesService.create(createDataDto);
  }

  @Get()
  findAll() {
    return this.statusesService.findAll();
  }
  // @Get('')
  // async index(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  // ): Promise<Pagination<Country>> {
  //   limit = limit > 100 ? 100 : limit;
  //   return this.statusesService.paginate({
  //     page,
  //     limit,
  //   });
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.statusesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataDto: UpdateStatusDto) {
    return this.statusesService.update(+id, updateDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.statusesService.remove(+id);
  }
}
