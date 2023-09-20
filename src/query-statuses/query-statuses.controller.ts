import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueryStatusesService } from './query-statuses.service';
import { CreateQueryStatusDto } from './dto/create-query-status.dto';
import { UpdateQueryStatusDto } from './dto/update-query-status.dto';

@Controller('query-statuses')
export class QueryStatusesController {
  constructor(private readonly queryStatusesService: QueryStatusesService) {}

  @Post()
  create(@Body() createQueryStatusDto: CreateQueryStatusDto) {
    return this.queryStatusesService.create(createQueryStatusDto);
  }

  @Get()
  findAll() {
    return this.queryStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQueryStatusDto: UpdateQueryStatusDto,
  ) {
    return this.queryStatusesService.update(+id, updateQueryStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queryStatusesService.remove(+id);
  }
}
