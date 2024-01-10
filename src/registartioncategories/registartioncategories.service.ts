import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { Registartioncategory } from './entities/registartioncategory.entity';
import { CreateRegistartioncategoryDto } from './dto/create-registartioncategory.dto';
import { UpdateRegistartioncategoryDto } from './dto/update-registartioncategory.dto';

@Injectable()
export class RegistartioncategoriesService {
  constructor(
    @InjectRepository(Registartioncategory)
    private registrationCategoryRepository: Repository<Registartioncategory>,
  ) {}

  create(createBookDto: CreateRegistartioncategoryDto) {
    return this.registrationCategoryRepository.save(createBookDto);
  }

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<Registartioncategory>> {
    const queryBuilder =
      this.registrationCategoryRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Registartioncategory>(queryBuilder, options);
  }

  findAll() {
    const registrationCategories = this.registrationCategoryRepository
      .createQueryBuilder('registrationCategories')
      .getMany();
    return registrationCategories;
  }

  findOne(id: number) {
    return this.registrationCategoryRepository.findOne(id);
  }

  update(id: number, updateQueryPriorityDto: UpdateRegistartioncategoryDto) {
    return this.registrationCategoryRepository.update(
      id,
      updateQueryPriorityDto,
    );
  }

  remove(id: number) {
    return this.registrationCategoryRepository.delete(id);
  }
}
