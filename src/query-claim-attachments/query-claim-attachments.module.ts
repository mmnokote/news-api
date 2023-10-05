import { Module } from '@nestjs/common';
import { QueryClaimAttachmentsService } from './query-claim-attachments.service';
import { QueryClaimAttachmentsController } from './query-claim-attachments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueryClaimAttachment } from './entities/query-claim-attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QueryClaimAttachment])],
  controllers: [QueryClaimAttachmentsController],
  providers: [QueryClaimAttachmentsService],
})
export class QueryClaimAttachmentsModule {}
