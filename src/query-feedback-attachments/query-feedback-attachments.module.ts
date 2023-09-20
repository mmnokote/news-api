import { Module } from '@nestjs/common';
import { QueryFeedbackAttachmentsService } from './query-feedback-attachments.service';
import { QueryFeedbackAttachmentsController } from './query-feedback-attachments.controller';

@Module({
  controllers: [QueryFeedbackAttachmentsController],
  providers: [QueryFeedbackAttachmentsService]
})
export class QueryFeedbackAttachmentsModule {}
