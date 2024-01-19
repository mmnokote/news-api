import { Test, TestingModule } from '@nestjs/testing';
import { AbstarctsService } from './abstarcts.service';

describe('AbstarctsService', () => {
  let service: AbstarctsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AbstarctsService],
    }).compile();

    service = module.get<AbstarctsService>(AbstarctsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
