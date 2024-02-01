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
import { CreateSubthemeDto } from './dto/create-subtheme.dto';
import { UpdateSubthemeDto } from './dto/update-subtheme.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Role } from 'src/users/entities/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { SubthemesService } from './subthemes.service';
// @UseGuards(JwtAuthGuard)
// @Roles(Role.ADMIN)
@Controller('subthemes')
export class SubthemesController {
  constructor(private readonly subthemeService: SubthemesService) {}

  @Post()
  create(@Body() createDataDto: CreateSubthemeDto) {
    return this.subthemeService.create(createDataDto);
  }

  @Get()
  findAll() {
    return this.subthemeService.findAll();
  }
  // @Get('')
  // async index(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  // ): Promise<Pagination<Country>> {
  //   limit = limit > 100 ? 100 : limit;
  //   return this.subthemeService.paginate({
  //     page,
  //     limit,
  //   });
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subthemeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDataDto: UpdateSubthemeDto) {
    return this.subthemeService.update(+id, updateDataDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subthemeService.remove(+id);
  }
}
