// import { Injectable } from '@nestjs/common';
// import { CreateAbstarctDto } from './dto/create-abstarct.dto';
// import { UpdateAbstarctDto } from './dto/update-abstarct.dto';

// @Injectable()
// export class AbstarctsService {
//   create(createAbstarctDto: CreateAbstarctDto) {
//     return 'This action adds a new abstarct';
//   }

// }

import { Injectable, NotFoundException } from '@nestjs/common';
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
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AbstarctsService {
  constructor(
    @InjectRepository(Abstarct)
    private abstractRepository: Repository<Abstarct>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // create(createAbstactDto: CreateAbstarctDto) {

  //   return this.abstractRepository.save(createAbstactDto);
  // }
  async create(createAbstactDto: CreateAbstarctDto) {
    const { email } = createAbstactDto;

    // Find user by email
    let user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException({
        message:
          'Invalid email provided. Please ensure you use the email address associated with your registration.',
      });
    }

    const abstractEntity: any = this.abstractRepository.create({
      email: createAbstactDto.email,
      title: createAbstactDto.title,
      author: createAbstactDto.author,
      affiliation: createAbstactDto.affiliation,
      presenting_author: createAbstactDto.presenting_author,
      background: createAbstactDto.background,
      objective: createAbstactDto.objective,
      methodology: createAbstactDto.methodology,
      results: createAbstactDto.results,
      subTheme: createAbstactDto.subTheme,
      conclusion: createAbstactDto.conclusion,
      recommendations: createAbstactDto.recommendations,
      inline: createAbstactDto.inline,
    });

    abstractEntity.user = user;
    // Save abstract to database
    return this.abstractRepository.save(abstractEntity);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Abstarct>> {
    const queryBuilder = this.abstractRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Abstarct>(queryBuilder, options);
  }

  async isEmailUnique(email: string): Promise<Abstarct | undefined> {
    return this.abstractRepository.findOne({ email });
  }

  async findAll() {
    const abstracts = await this.abstractRepository
      .createQueryBuilder('abstracts')
      .leftJoinAndSelect('abstracts.user', 'user')
      .leftJoinAndSelect('abstracts.subTheme', 'sub_theme')
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
