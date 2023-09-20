import { Test, TestingModule } from '@nestjs/testing';
import { QueryFeedbackAttachmentsController } from './query-feedback-attachments.controller';
import { QueryFeedbackAttachmentsService } from './query-feedback-attachments.service';

describe('QueryFeedbackAttachmentsController', () => {
  let controller: QueryFeedbackAttachmentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueryFeedbackAttachmentsController],
      providers: [QueryFeedbackAttachmentsService],
    }).compile();

    controller = module.get<QueryFeedbackAttachmentsController>(QueryFeedbackAttachmentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
