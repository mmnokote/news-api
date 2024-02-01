import { Module } from '@nestjs/common';
import { SubthemesService } from './subthemes.service';
import { SubthemesController } from './subthemes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtheme } from './entities/subtheme.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subtheme])],
  controllers: [SubthemesController],
  providers: [SubthemesService],
})
export class SubthemesModule {}
