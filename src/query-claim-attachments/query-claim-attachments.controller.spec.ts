import { Test, TestingModule } from '@nestjs/testing';
import { QueryClaimAttachmentsController } from './query-claim-attachments.controller';
import { QueryClaimAttachmentsService } from './query-claim-attachments.service';

describe('QueryClaimAttachmentsController', () => {
  let controller: QueryClaimAttachmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryClaimAttachmentsController],
      providers: [QueryClaimAttachmentsService],
    }).compile();

    controller = module.get<QueryClaimAttachmentsController>(QueryClaimAttachmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
