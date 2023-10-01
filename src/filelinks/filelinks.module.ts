import { Module } from '@nestjs/common';
import { FilelinksService } from './filelinks.service';
import { FilelinksController } from './filelinks.controller';

@Module({
  controllers: [FilelinksController],
  providers: [FilelinksService]
})
export class FilelinksModule {}
