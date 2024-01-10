import { Test, TestingModule } from '@nestjs/testing';
import { SubthemesController } from './subthemes.controller';
import { SubthemesService } from './subthemes.service';

describe('SubthemesController', () => {
  let controller: SubthemesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubthemesController],
      providers: [SubthemesService],
    }).compile();

    controller = module.get<SubthemesController>(SubthemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
