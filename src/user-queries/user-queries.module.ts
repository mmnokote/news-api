import { Module } from '@nestjs/common';
import { UserQueriesService } from './user-queries.service';
import { UserQueriesController } from './user-queries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { QueriesModule } from 'src/queries/queries.module';
import { User } from 'src/users/entities/user.entity';
import { Query } from 'src/queries/entities/query.entity';
import { QueryStatus } from 'src/query-statuses/entities/query-status.entity';
import { QueryStatusesModule } from 'src/query-statuses/query-statuses.module';
import { QueryCategory } from 'src/query-categories/entities/query-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Query, QueryStatus, QueryCategory]),
    UsersModule,
    QueriesModule,
    QueryStatusesModule,
  ],
  controllers: [UserQueriesController],
  providers: [UserQueriesService],
})
export class UserQueriesModule {}
