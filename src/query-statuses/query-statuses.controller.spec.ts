import { Test, TestingModule } from '@nestjs/testing';
import { QueryStatusesController } from './query-statuses.controller';
import { QueryStatusesService } from './query-statuses.service';

describe('QueryStatusesController', () => {
  let controller: QueryStatusesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryStatusesController],
      providers: [QueryStatusesService],
    }).compile();

    controller = module.get<QueryStatusesController>(QueryStatusesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
