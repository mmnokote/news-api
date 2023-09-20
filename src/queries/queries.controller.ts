import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueriesService } from './queries.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';

@Controller('queries')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @Post()
  create(@Body() createQueryDto: CreateQueryDto) {
    const data: any = createQueryDto;
    // console.log('xxxxxxxx', createQueryDto);

    return this.queriesService.create(data);
  }
  @Patch(':id')
  sendFeedback(
    @Param('id') id: string,
    @Body() updateQueryDto: UpdateQueryDto,
  ) {
    const data: any = updateQueryDto;
    console.log('xxxxxxxxFeedback', updateQueryDto);

    return this.queriesService.createFeedback(+id, data);
  }

  @Get()
  findAll() {
    return this.queriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQueryDto: UpdateQueryDto) {
  //   return this.queriesService.update(+id, updateQueryDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queriesService.remove(+id);
  }
}
