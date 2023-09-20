import { Test, TestingModule } from '@nestjs/testing';
import { QueryCategoriesController } from './query-categories.controller';
import { QueryCategoriesService } from './query-categories.service';

describe('QueryCategoriesController', () => {
  let controller: QueryCategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryCategoriesController],
      providers: [QueryCategoriesService],
    }).compile();

    controller = module.get<QueryCategoriesController>(QueryCategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
