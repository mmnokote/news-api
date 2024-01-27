import { Module } from '@nestjs/common';
import { AbstarctsService } from './abstarcts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abstarct } from './entities/abstarct.entity';
import { AbstarctsController } from './abstarcts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Abstarct])],
  controllers: [AbstarctsController],
  providers: [AbstarctsService],
  exports: [AbstarctsService],
})
export class AbstarctsModule {}
