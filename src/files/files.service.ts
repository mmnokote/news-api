import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class FilesService extends TypeOrmCrudService<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {
    super(fileRepo);
  }

  async dbSave(
    file: Express.Multer.File,
    newFileName: string,
  ): Promise<FileEntity> {
    // console.log('ffffffffffffffffffffffff', file);
    return this.fileRepo.save(this.mapUploadFile(file, newFileName));
  }

  private mapUploadFile(
    file: Express.Multer.File,
    newFileName: string,
  ): Partial<FileEntity> {
    const { originalname, mimetype, size, filename } = file;

    return {
      original_name: originalname,
      dispaly_path: filename,
      size,
      current_name: newFileName,
      extension: mimetype.split('/')[1],
    };
  }
}
