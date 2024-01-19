import { Test, TestingModule } from '@nestjs/testing';
import { AbstarctsController } from './abstarcts.controller';
import { AbstarctsService } from './abstarcts.service';

describe('AbstarctsController', () => {
  let controller: AbstarctsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AbstarctsController],
      providers: [AbstarctsService],
    }).compile();

    controller = module.get<AbstarctsController>(AbstarctsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
