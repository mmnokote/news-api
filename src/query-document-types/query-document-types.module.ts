import { Module } from '@nestjs/common';
import { QueryDocumentTypesService } from './query-document-types.service';
import { QueryDocumentTypesController } from './query-document-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryCategory } from 'src/query-categories/entities/query-category.entity';
import { QueryCategoriesModule } from 'src/query-categories/query-categories.module';
import { QueryDocumentType } from './entities/query-document-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([QueryDocumentType, QueryCategory]),
    QueryCategoriesModule,
  ],
  controllers: [QueryDocumentTypesController],
  providers: [QueryDocumentTypesService],
})
export class QueryDocumentTypesModule {}
