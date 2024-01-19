import { Module } from '@nestjs/common';
import { AbstarctsService } from './abstarcts.service';
import { AbstarctsController } from './abstarcts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abstarct } from './entities/abstarct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Abstarct])],
  controllers: [AbstarctsController],
  providers: [AbstarctsService],
})
export class AbstarctsModule {}
