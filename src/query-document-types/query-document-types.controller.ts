import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { QueryDocumentTypesService } from './query-document-types.service';
import { CreateQueryDocumentTypeDto } from './dto/create-query-document-type.dto';
import { UpdateQueryDocumentTypeDto } from './dto/update-query-document-type.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('query-document-types')
export class QueryDocumentTypesController {
  constructor(
    private readonly queryDocumentTypesService: QueryDocumentTypesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createQueryDocumentTypeDto: CreateQueryDocumentTypeDto) {
    return this.queryDocumentTypesService.create(createQueryDocumentTypeDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.queryDocumentTypesService.findAll();
  }

  @Get('getQueryDocumentTypesByCategory/:id')
  findAllByid(@Param('id') id: string) {
    return this.queryDocumentTypesService.findAllById(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Get('getQueryDocumentFeedback')
  findAllNotForQuery() {
    return this.queryDocumentTypesService.findAllNFQ();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryDocumentTypesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queryDocumentTypesService.remove(+id);
  }
}
