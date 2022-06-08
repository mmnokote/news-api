import { Test, TestingModule } from '@nestjs/testing';
import { FileuploadsController } from './fileuploads.controller';
import { FileuploadsService } from './fileuploads.service';

describe('FileuploadsController', () => {
  let controller: FileuploadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileuploadsController],
      providers: [FileuploadsService],
    }).compile();

    controller = module.get<FileuploadsController>(FileuploadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
