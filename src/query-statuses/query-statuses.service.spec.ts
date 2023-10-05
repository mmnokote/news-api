import { Test, TestingModule } from '@nestjs/testing';
import { QueryStatusesService } from './query-statuses.service';

describe('QueryStatusesService', () => {
  let service: QueryStatusesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryStatusesService],
    }).compile();

    service = module.get<QueryStatusesService>(QueryStatusesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
