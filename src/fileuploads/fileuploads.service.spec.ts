import { Test, TestingModule } from '@nestjs/testing';
import { FileuploadsService } from './fileuploads.service';

describe('FileuploadsService', () => {
  let service: FileuploadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileuploadsService],
    }).compile();

    service = module.get<FileuploadsService>(FileuploadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
