import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateFileuploadDto } from './dto/create-fileupload.dto';
import { UpdateFileuploadDto } from './dto/update-fileupload.dto';
import { Fileupload } from './entities/fileupload.entity';

@Injectable()
export class FileuploadsService {
  constructor(
    @InjectRepository(Fileupload)
    private uploadFileRepository: Repository<Fileupload>,
    private usersService: UsersService,
  ) {}

  async dbSave(
    file: Express.Multer.File,
    newFileName: string,
  ): Promise<Fileupload> {
    return this.uploadFileRepository.save(
      this.mapUploadFile(file, newFileName),
    );
  }

  mapUploadFile(
    file: Express.Multer.File,
    newFileName: string,
  ): Partial<Fileupload> {
    const { originalname, mimetype, size } = file;

    return {
      name: originalname,
      file_path: newFileName,
      extension: mimetype.split('/')[1],
    };
  }

  create(createFileuploadDto: CreateFileuploadDto) {
    return 'This action adds a new fileupload';
  }

  findAll() {
    return `This action returns all fileuploads`;
  }

  findOne(id: number) {
    return this.uploadFileRepository.findOne(id);
  }

  update(id: number, updateFileuploadDto: UpdateFileuploadDto) {
    return `This action updates a #${id} fileupload`;
  }

  remove(id: number) {
    return `This action removes a #${id} fileupload`;
  }
}
