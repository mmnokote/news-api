import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileuploadsService } from './fileuploads.service';
import { CreateFileuploadDto } from './dto/create-fileupload.dto';
import { UpdateFileuploadDto } from './dto/update-fileupload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Fileupload } from './entities/fileupload.entity';
import { diskStorage } from 'multer';
import { v4 } from 'uuid';
import { GenericService } from 'src/generic.service';

@Controller('fileuploads')
export class FileuploadsController {
  static genericService: GenericService;

  constructor(
    public fileuploadsService: FileuploadsService,
    genericService: GenericService,
  ) {
    FileuploadsController.genericService = genericService;
  }

  @Post('uploadx')
  @UseInterceptors(FileInterceptor('photo', { dest: 'public/uploads' }))
  uploadSinglex(@UploadedFile() file) {
    const [, ext] = file.mimetype.split('/');
    console.log('Fileeeeee', file.filename + `.${ext}`);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: Express.Request, file: Express.Multer.File, cb) =>
          cb(null, 'public/uploads'),
        filename: (req: Express.Request, file: Express.Multer.File, cb) => {
          const [, ext] = file.mimetype.split('/');
          FileuploadsController.genericService.pcoket.filename = `${v4()}.${ext}`;
          cb(null, FileuploadsController.genericService.pcoket.filename);
        },
      }),
      limits: {
        fileSize: 1e7,
        files: 1,
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<Fileupload> {
    return this.fileuploadsService.dbSave(
      file,
      FileuploadsController.genericService.pcoket.filename,
    );
  }

  @Post()
  create(@Body() createFileuploadDto: CreateFileuploadDto) {
    return this.fileuploadsService.create(createFileuploadDto);
  }

  @Get()
  findAll() {
    return this.fileuploadsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileuploadsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileuploadDto: UpdateFileuploadDto,
  ) {
    return this.fileuploadsService.update(+id, updateFileuploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileuploadsService.remove(+id);
  }
}
