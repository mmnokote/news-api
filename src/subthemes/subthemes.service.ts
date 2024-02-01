import { CreateSubthemeDto } from './dto/create-subtheme.dto';
import { UpdateSubthemeDto } from './dto/update-subtheme.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Subtheme } from './entities/subtheme.entity';

@Injectable()
export class SubthemesService {
  constructor(
    @InjectRepository(Subtheme)
    private subthemeRepository: Repository<Subtheme>,
  ) {}

  create(createBookDto: CreateSubthemeDto) {
    return this.subthemeRepository.save(createBookDto);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Subtheme>> {
    const queryBuilder = this.subthemeRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Subtheme>(queryBuilder, options);
  }

  findAll() {
    const countries = this.subthemeRepository.createQueryBuilder().getMany();
    return countries;

    // const id = 3;
    // return this.subthemeRepository
    //   .createQueryBuilder('countries')
    //   .leftJoinAndSelect('countries.reader', 'reader')
    //   .where('reader.id = :readerId', { readerId: id })
    //   .getMany();
  }

  findOne(id: number) {
    return this.subthemeRepository.findOne(id);
  }

  update(id: number, updateQueryPriorityDto: UpdateSubthemeDto) {
    return this.subthemeRepository.update(id, updateQueryPriorityDto);
  }

  remove(id: number) {
    return this.subthemeRepository.delete(id);
  }
}
