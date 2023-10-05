import { Injectable } from '@nestjs/common';
import { CreateUserQueryDto } from './dto/create-user-query.dto';
import { UpdateUserQueryDto } from './dto/update-user-query.dto';

import { Repository } from 'typeorm';
import { Query } from 'src/queries/entities/query.entity';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryStatus } from 'src/query-statuses/entities/query-status.entity';
import { UserQuery } from './entities/user-query.entity';

@Injectable()
export class UserQueriesService {
  constructor(
    @InjectRepository(User)
    private userQueyRepository: Repository<UserQuery>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Query)
    private queryRepository: Repository<Query>,

    @InjectRepository(QueryStatus)
    private querySatatusRepository: Repository<QueryStatus>,
  ) {}

  async assignQueryToUser(userId: number, queriesId: number): Promise<User> {
    // const user = await this.userRepository.findOne(userId);
    const queries = await this.queryRepository.findOne(queriesId);
    const users = await this.userRepository.findOne(userId);

    const id = queries.id;
    const idu = users.id;

    // console.log('qqqq', user.id);

    const query = await this.queryRepository.findOne(id);
    const user = await this.userRepository.findOne(idu);
    const queryStatus = await this.querySatatusRepository.findOne(2);

    query.queryStatus = queryStatus;
    query.user = user;
    // query.users = queryStatus;
    console.log('xzzxxzzzz', user);
    this.queryRepository.save(query);
    return this.userRepository.save(user);
  }

  create(createUserQueryDto: CreateUserQueryDto) {
    return 'This action adds a new userQuery';
  }

  findAll() {
    return `This action returns all userQueries`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userQuery`;
  }

  update(id: number, updateUserQueryDto: UpdateUserQueryDto) {
    return `This action updates a #${id} userQuery`;
  }

  remove(id: number) {
    return `This action removes a #${id} userQuery`;
  }
}
