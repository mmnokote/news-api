import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { AbstarctsModule } from 'src/abstarcts/abstarcts.module';
import { Abstarct } from 'src/abstarcts/entities/abstarct.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Like, Abstarct]), AbstarctsModule],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
