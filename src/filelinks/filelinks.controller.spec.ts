import { Test, TestingModule } from '@nestjs/testing';
import { FilelinksController } from './filelinks.controller';
import { FilelinksService } from './filelinks.service';

describe('FilelinksController', () => {
  let controller: FilelinksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilelinksController],
      providers: [FilelinksService],
    }).compile();

    controller = module.get<FilelinksController>(FilelinksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
