import { Test, TestingModule } from '@nestjs/testing';
import { QueryDocumentTypesController } from './query-document-types.controller';
import { QueryDocumentTypesService } from './query-document-types.service';

describe('QueryDocumentTypesController', () => {
  let controller: QueryDocumentTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryDocumentTypesController],
      providers: [QueryDocumentTypesService],
    }).compile();

    controller = module.get<QueryDocumentTypesController>(QueryDocumentTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
