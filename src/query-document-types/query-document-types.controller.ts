import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueryDocumentTypesService } from './query-document-types.service';
import { CreateQueryDocumentTypeDto } from './dto/create-query-document-type.dto';
import { UpdateQueryDocumentTypeDto } from './dto/update-query-document-type.dto';

@Controller('query-document-types')
export class QueryDocumentTypesController {
  constructor(
    private readonly queryDocumentTypesService: QueryDocumentTypesService,
  ) {}

  @Post()
  create(@Body() createQueryDocumentTypeDto: CreateQueryDocumentTypeDto) {
    return this.queryDocumentTypesService.create(createQueryDocumentTypeDto);
  }

  @Get()
  findAll() {
    return this.queryDocumentTypesService.findAll();
  }

  @Get('getQueryDocumentTypesByCategory/:id')
  findAllByid(@Param('id') id: string) {
    return this.queryDocumentTypesService.findAllById(+id);
  }

  @Get('getQueryDocumentFeedback')
  findAllNotForQuery() {
    return this.queryDocumentTypesService.findAllNFQ();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryDocumentTypesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQueryDocumentTypeDto: UpdateQueryDocumentTypeDto,
  ) {
    return this.queryDocumentTypesService.update(
      +id,
      updateQueryDocumentTypeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queryDocumentTypesService.remove(+id);
  }
}
