import { Injectable } from '@nestjs/common';
import { CreateQueryStatusDto } from './dto/create-query-status.dto';
import { UpdateQueryStatusDto } from './dto/update-query-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryStatus } from './entities/query-status.entity';

@Injectable()
export class QueryStatusesService {
  constructor(
    @InjectRepository(QueryStatus)
    private queryStatusRepository: Repository<QueryStatus>,
  ) {}

  create(createBookDto: CreateQueryStatusDto) {
    return this.queryStatusRepository.save(createBookDto);
  }

  findAll() {
    const queryStatuses = this.queryStatusRepository
      .createQueryBuilder('queryStatuses')
      .getMany();
    return queryStatuses;

    // const id = 3;
    // return this.queryStatusRepository
    //   .createQueryBuilder('queryStatuses')
    //   .leftJoinAndSelect('queryStatuses.reader', 'reader')
    //   .where('reader.id = :readerId', { readerId: id })
    //   .getMany();
  }

  findOne(id: number) {
    return this.queryStatusRepository.findOne(id);
  }

  update(id: number, updateQueryStatusDto: UpdateQueryStatusDto) {
    return this.queryStatusRepository.update(id, updateQueryStatusDto);
  }

  remove(id: number) {
    return this.queryStatusRepository.delete(id);
  }
}
