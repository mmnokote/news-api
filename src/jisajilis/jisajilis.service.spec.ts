import { Test, TestingModule } from '@nestjs/testing';
import { JisajilisService } from './jisajilis.service';

describe('JisajilisService', () => {
  let service: JisajilisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JisajilisService],
    }).compile();

    service = module.get<JisajilisService>(JisajilisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
