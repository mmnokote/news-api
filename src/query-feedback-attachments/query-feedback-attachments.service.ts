import { Injectable } from '@nestjs/common';
import { CreateQueryFeedbackAttachmentDto } from './dto/create-query-feedback-attachment.dto';
import { UpdateQueryFeedbackAttachmentDto } from './dto/update-query-feedback-attachment.dto';

@Injectable()
export class QueryFeedbackAttachmentsService {
  create(createQueryFeedbackAttachmentDto: CreateQueryFeedbackAttachmentDto) {
    return 'This action adds a new queryFeedbackAttachment';
  }

  findAll() {
    return `This action returns all queryFeedbackAttachments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} queryFeedbackAttachment`;
  }

  update(id: number, updateQueryFeedbackAttachmentDto: UpdateQueryFeedbackAttachmentDto) {
    return `This action updates a #${id} queryFeedbackAttachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} queryFeedbackAttachment`;
  }
}
