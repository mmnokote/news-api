import { Module } from '@nestjs/common';
import { FileuploadsService } from './fileuploads.service';
import { FileuploadsController } from './fileuploads.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fileupload } from './entities/fileupload.entity';
import { GenericService } from 'src/generic.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Fileupload])],
  controllers: [FileuploadsController],
  providers: [FileuploadsService, GenericService],
})
export class FileuploadsModule {}
