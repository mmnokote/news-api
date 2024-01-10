import { Test, TestingModule } from '@nestjs/testing';
import { RegistartioncategoriesService } from './registartioncategories.service';

describe('RegistartioncategoriesService', () => {
  let service: RegistartioncategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistartioncategoriesService],
    }).compile();

    service = module.get<RegistartioncategoriesService>(RegistartioncategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
