import { Test, TestingModule } from '@nestjs/testing';
import { QueryClaimAttachmentsService } from './query-claim-attachments.service';

describe('QueryClaimAttachmentsService', () => {
  let service: QueryClaimAttachmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryClaimAttachmentsService],
    }).compile();

    service = module.get<QueryClaimAttachmentsService>(QueryClaimAttachmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
