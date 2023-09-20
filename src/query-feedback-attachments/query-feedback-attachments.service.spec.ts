import { Test, TestingModule } from '@nestjs/testing';
import { QueryFeedbackAttachmentsService } from './query-feedback-attachments.service';

describe('QueryFeedbackAttachmentsService', () => {
  let service: QueryFeedbackAttachmentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryFeedbackAttachmentsService],
    }).compile();

    service = module.get<QueryFeedbackAttachmentsService>(QueryFeedbackAttachmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
