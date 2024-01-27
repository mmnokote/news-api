// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { AbstarctsService } from './abstarcts.service';
// import { CreateAbstarctDto } from './dto/create-abstarct.dto';
// import { UpdateAbstarctDto } from './dto/update-abstarct.dto';

// @Controller('abstarcts')
// export class AbstarctsController {
//   constructor(private readonly abstarctsService: AbstarctsService) {}

// }

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
  UsePipes,
} from '@nestjs/common';

import { CreateAbstarctDto } from './dto/create-abstarct.dto';
import { UpdateAbstarctDto } from './dto/update-abstarct.dto';

import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Role } from 'src/users/entities/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { AbstarctsService } from './abstarcts.service';
// @UseGuards(JwtAuthGuard)
// @Roles(Role.ADMIN)
@Controller('abstarcts')
export class AbstarctsController {
  constructor(private readonly abstarctsService: AbstarctsService) {}

  @Post()
  create(@Body() createDataDto: CreateAbstarctDto) {
    return this.abstarctsService.create(createDataDto);
  }

  @Get()
  findAll() {
    return this.abstarctsService.findAll();
  }
  // @Get('')
  // async index(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  // ): Promise<Pagination<Country>> {
  //   limit = limit > 100 ? 100 : limit;
  //   return this.abstarctsService.paginate({
  //     page,
  //     limit,
  //   });
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abstarctsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateAbstarctDto) {
    return this.abstarctsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abstarctsService.remove(+id);
  }
}
