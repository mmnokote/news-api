import { Test, TestingModule } from '@nestjs/testing';
import { RegistartioncategoriesController } from './registartioncategories.controller';
import { RegistartioncategoriesService } from './registartioncategories.service';

describe('RegistartioncategoriesController', () => {
  let controller: RegistartioncategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistartioncategoriesController],
      providers: [RegistartioncategoriesService],
    }).compile();

    controller = module.get<RegistartioncategoriesController>(RegistartioncategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
