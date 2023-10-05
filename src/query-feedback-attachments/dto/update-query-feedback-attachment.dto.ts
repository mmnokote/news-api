import { PartialType } from '@nestjs/swagger';
import { CreateQueryFeedbackAttachmentDto } from './create-query-feedback-attachment.dto';

export class UpdateQueryFeedbackAttachmentDto extends PartialType(CreateQueryFeedbackAttachmentDto) {}
