// import { Injectable } from '@nestjs/common';
// import { CreateAbstarctDto } from './dto/create-abstarct.dto';
// import { UpdateAbstarctDto } from './dto/update-abstarct.dto';

// @Injectable()
// export class AbstarctsService {
//   create(createAbstarctDto: CreateAbstarctDto) {
//     return 'This action adds a new abstarct';
//   }

// }

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { CreateAbstarctDto } from './dto/create-abstarct.dto';
import { UpdateAbstarctDto } from './dto/update-abstarct.dto';
import { Abstarct } from './entities/abstarct.entity';

@Injectable()
export class AbstarctsService {
  constructor(
    @InjectRepository(Abstarct)
    private abstractRepository: Repository<Abstarct>,
  ) {}

  create(createAbstactDto: CreateAbstarctDto) {
    return this.abstractRepository.save(createAbstactDto);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Abstarct>> {
    const queryBuilder = this.abstractRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Abstarct>(queryBuilder, options);
  }

  async isEmailUnique(email: string): Promise<Abstarct | undefined> {
    return this.abstractRepository.findOne({ email });
  }

  findAll() {
    const abstracts = this.abstractRepository
      .createQueryBuilder('abstracts')
      .getMany();
    return abstracts;
  }

  findOne(id: number) {
    return this.abstractRepository.findOne(id);
  }

  update(id: number, updateQueryPriorityDto: UpdateAbstarctDto) {
    return this.abstractRepository.update(id, updateQueryPriorityDto);
  }

  remove(id: number) {
    return this.abstractRepository.delete(id);
  }
}
