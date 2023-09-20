import { Module } from '@nestjs/common';
import { QueryCategoriesService } from './query-categories.service';
import { QueryCategoriesController } from './query-categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryCategory } from './entities/query-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QueryCategory])],
  controllers: [QueryCategoriesController],
  providers: [QueryCategoriesService],
})
export class QueryCategoriesModule {}
