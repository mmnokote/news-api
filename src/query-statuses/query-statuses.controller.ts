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
import { QueryStatusesService } from './query-statuses.service';
import { CreateQueryStatusDto } from './dto/create-query-status.dto';
import { UpdateQueryStatusDto } from './dto/update-query-status.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { QueryStatus } from './entities/query-status.entity';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('query-statuses')
export class QueryStatusesController {
  constructor(private readonly queryStatusesService: QueryStatusesService) {}

  @Post()
  create(@Body() createQueryStatusDto: CreateQueryStatusDto) {
    return this.queryStatusesService.create(createQueryStatusDto);
  }

  // @Get()
  // findAll() {
  //   return this.queryStatusesService.findAll();
  // }
  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ): Promise<Pagination<QueryStatus>> {
    limit = limit > 100 ? 100 : limit;
    return this.queryStatusesService.paginate({
      page,
      limit,
    });
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
