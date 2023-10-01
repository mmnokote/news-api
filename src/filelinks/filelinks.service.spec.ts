import { Test, TestingModule } from '@nestjs/testing';
import { FilelinksService } from './filelinks.service';

describe('FilelinksService', () => {
  let service: FilelinksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilelinksService],
    }).compile();

    service = module.get<FilelinksService>(FilelinksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
