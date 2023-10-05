import { Test, TestingModule } from '@nestjs/testing';
import { QueryCategoriesService } from './query-categories.service';

describe('QueryCategoriesService', () => {
  let service: QueryCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryCategoriesService],
    }).compile();

    service = module.get<QueryCategoriesService>(QueryCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
