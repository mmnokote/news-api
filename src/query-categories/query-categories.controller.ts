import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { QueryCategoriesService } from './query-categories.service';
import { CreateQueryCategoryDto } from './dto/create-query-category.dto';
import { UpdateQueryCategoryDto } from './dto/update-query-category.dto';
import { Response } from 'express'; // Import the Response object
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
// @UseGuards(JwtAuthGuard)
@Controller('query-categories')
export class QueryCategoriesController {
  constructor(
    private readonly queryCategoriesService: QueryCategoriesService,
  ) {}

  @Post()
  async create(
    @Body() createQueryCategoryDto: CreateQueryCategoryDto,
    @Res() response: Response,
  ) {
    const newItem = await this.queryCategoriesService.create(
      createQueryCategoryDto,
    );
    // return newItem;
    // Set the HTTP status code in the response
    response.status(HttpStatus.CREATED).send(newItem); // Set status code to 201 (Created)
  }

  @Get()
  findAll() {
    return this.queryCategoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryCategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQueryCategoryDto: UpdateQueryCategoryDto,
  ) {
    return this.queryCategoriesService.update(+id, updateQueryCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queryCategoriesService.remove(+id);
  }
}
