import { Injectable } from '@nestjs/common';
import { CreateQueryCategoryDto } from './dto/create-query-category.dto';
import { UpdateQueryCategoryDto } from './dto/update-query-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryCategory } from './entities/query-category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueryCategoriesService {
  constructor(
    @InjectRepository(QueryCategory)
    private queriesCategoryRepository: Repository<QueryCategory>,
  ) {}

  create(createQueryCategoryDto: CreateQueryCategoryDto) {
    return this.queriesCategoryRepository.save(createQueryCategoryDto);
  }

  findAll() {
    const queryCategories = this.queriesCategoryRepository
      .createQueryBuilder('queryCategory')
      .getMany();
    return queryCategories;

    // const id = 3;
    // return this.queriesCategoryRepository
    //   .createQueryBuilder('queryCategory')
    //   .leftJoinAndSelect('queryCategory.reader', 'reader')
    //   .where('reader.id = :readerId', { readerId: id })
    //   .getMany();
  }

  findOne(id: number) {
    return this.queriesCategoryRepository.findOne(id);
  }

  update(id: number, updateQuerycategoryDto: UpdateQueryCategoryDto) {
    return this.queriesCategoryRepository.update(id, updateQuerycategoryDto);
  }

  remove(id: number) {
    return this.queriesCategoryRepository.delete(id);
  }
}
