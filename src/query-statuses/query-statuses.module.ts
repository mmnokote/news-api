import { Module } from '@nestjs/common';
import { QueryStatusesService } from './query-statuses.service';
import { QueryStatusesController } from './query-statuses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryStatus } from './entities/query-status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QueryStatus])],
  controllers: [QueryStatusesController],
  providers: [QueryStatusesService],
})
export class QueryStatusesModule {}
