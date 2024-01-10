import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubthemesService } from './subthemes.service';
import { CreateSubthemeDto } from './dto/create-subtheme.dto';
import { UpdateSubthemeDto } from './dto/update-subtheme.dto';

@Controller('subthemes')
export class SubthemesController {
  constructor(private readonly subthemesService: SubthemesService) {}

  @Post()
  create(@Body() createSubthemeDto: CreateSubthemeDto) {
    return this.subthemesService.create(createSubthemeDto);
  }

  @Get()
  findAll() {
    return this.subthemesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subthemesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubthemeDto: UpdateSubthemeDto) {
    return this.subthemesService.update(+id, updateSubthemeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subthemesService.remove(+id);
  }
}
