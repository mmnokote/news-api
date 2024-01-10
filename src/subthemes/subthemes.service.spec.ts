import { Test, TestingModule } from '@nestjs/testing';
import { SubthemesService } from './subthemes.service';

describe('SubthemesService', () => {
  let service: SubthemesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubthemesService],
    }).compile();

    service = module.get<SubthemesService>(SubthemesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
