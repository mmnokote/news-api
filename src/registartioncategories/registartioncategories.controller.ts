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

import { CreateRegistartioncategoryDto } from './dto/create-registartioncategory.dto';
import { UpdateRegistartioncategoryDto } from './dto/update-registartioncategory.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Role } from 'src/users/entities/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { RegistartioncategoriesService } from './registartioncategories.service';
// @UseGuards(JwtAuthGuard)
// @Roles(Role.ADMIN)
@Controller('registartioncategories')
export class RegistartioncategoriesController {
  constructor(
    private readonly registartioncategoriesService: RegistartioncategoriesService,
  ) {}

  @Post()
  create(@Body() createDataDto: CreateRegistartioncategoryDto) {
    return this.registartioncategoriesService.create(createDataDto);
  }

  @Get()
  findAll() {
    return this.registartioncategoriesService.findAll();
  }
  // @Get('')
  // async index(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  // ): Promise<Pagination<Country>> {
  //   limit = limit > 100 ? 100 : limit;
  //   return this.registartioncategoriesService.paginate({
  //     page,
  //     limit,
  //   });
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registartioncategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: UpdateRegistartioncategoryDto,
  ) {
    return this.registartioncategoriesService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registartioncategoriesService.remove(+id);
  }
}
