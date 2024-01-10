import { Module } from '@nestjs/common';
import { SubthemesService } from './subthemes.service';
import { SubthemesController } from './subthemes.controller';

@Module({
  controllers: [SubthemesController],
  providers: [SubthemesService]
})
export class SubthemesModule {}
