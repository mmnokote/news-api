import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileEntity } from './entities/file.entity';
import { GenericService } from 'src/generic/generic.service';
import { v4 } from 'uuid';
import { Crud, CrudController } from '@nestjsx/crud';

@Crud({
  model: {
    type: FileEntity,
  },
  routes: {
    only: ['getOneBase'],
  },
})
@Controller('files')
export class FilesController implements CrudController<FileEntity> {
  static genericService: GenericService;
  constructor(public service: FilesService, genericService: GenericService) {
    FilesController.genericService = genericService;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req: Express.Request, file: Express.Multer.File, cb) =>
          cb(
            null,
            // '/home/mmnokote/Projects/conference/koference-ui/public/uploads',
            '/var/www/html/dist/uploads',
          ),
        filename: (req: Express.Request, file: Express.Multer.File, cb) => {
          const [, ext] = file.mimetype.split('/');
          FilesController.genericService.pcoket.filename = `${v4()}.${ext}`;
          cb(null, FilesController.genericService.pcoket.filename);
        },
      }),
      limits: {
        fileSize: 1e7, //10MB
        files: 1,
      },
    }),
  )
  uploadfile(@UploadedFile() file: Express.Multer.File): Promise<FileEntity> {
    return this.service.dbSave(
      file,
      FilesController.genericService.pcoket.filename,
    );
  }
  // async uploadfile(
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<{ message: string }> {
  //   await this.service.dbSave(
  //     file,
  //     FilesController.genericService.pcoket.filename,
  //   );
  //   return {
  //     message:
  //       'Payment document uploaded successfully. Please proceed to save your form to complete.',
  //   };
  // }

  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadfile(
  //   @UploadedFile() file: Express.Multer.File,
  // ): Promise<{ message: string }> {
  //   await this.service.dbSave(
  //     file,
  //     FilesController.genericService.pcoket.filename,
  //   );
  //   return {
  //     message:
  //       'Payment uploaded successfully. Please log out and log in again to see the changes.',
  //   };
  // }
}
