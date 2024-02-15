import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Status } from './entities/status.entity';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  create(createBookDto: CreateStatusDto) {
    return this.statusRepository.save(createBookDto);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Status>> {
    const queryBuilder = this.statusRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Status>(queryBuilder, options);
  }

  findAll() {
    const countries = this.statusRepository.createQueryBuilder().getMany();
    return countries;

    // const id = 3;
    // return this.statusRepository
    //   .createQueryBuilder('countries')
    //   .leftJoinAndSelect('countries.reader', 'reader')
    //   .where('reader.id = :readerId', { readerId: id })
    //   .getMany();
  }

  findOne(id: number) {
    return this.statusRepository.findOne(id);
  }

  update(id: number, updateQueryPriorityDto: UpdateStatusDto) {
    return this.statusRepository.update(id, updateQueryPriorityDto);
  }

  remove(id: number) {
    return this.statusRepository.delete(id);
  }
}
