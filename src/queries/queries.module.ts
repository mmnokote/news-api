import { Module } from '@nestjs/common';
import { QueriesService } from './queries.service';
import { QueriesController } from './queries.controller';
import { Query } from './entities/query.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryClaimAttachment } from 'src/query-claim-attachments/entities/query-claim-attachment.entity';
import { QueryClaimAttachmentsModule } from 'src/query-claim-attachments/query-claim-attachments.module';
import { QueryClaimAttachmentsService } from 'src/query-claim-attachments/query-claim-attachments.service';
import { QueryFeedbackAttachment } from 'src/query-feedback-attachments/entities/query-feedback-attachment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Query,
      QueryClaimAttachment,
      QueryFeedbackAttachment,
    ]),
    QueryClaimAttachmentsModule,
  ],
  controllers: [QueriesController],
  providers: [QueriesService, QueryClaimAttachmentsService],
  exports: [QueriesService],
})
export class QueriesModule {}
