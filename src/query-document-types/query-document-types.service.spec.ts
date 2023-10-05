import { Test, TestingModule } from '@nestjs/testing';
import { QueryDocumentTypesService } from './query-document-types.service';

describe('QueryDocumentTypesService', () => {
  let service: QueryDocumentTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryDocumentTypesService],
    }).compile();

    service = module.get<QueryDocumentTypesService>(QueryDocumentTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
