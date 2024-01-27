import { Test, TestingModule } from '@nestjs/testing';
import { JisajilisController } from './jisajilis.controller';
import { JisajilisService } from './jisajilis.service';

describe('JisajilisController', () => {
  let controller: JisajilisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JisajilisController],
      providers: [JisajilisService],
    }).compile();

    controller = module.get<JisajilisController>(JisajilisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
