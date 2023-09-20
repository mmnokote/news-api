import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QueryFeedbackAttachmentsService } from './query-feedback-attachments.service';
import { CreateQueryFeedbackAttachmentDto } from './dto/create-query-feedback-attachment.dto';
import { UpdateQueryFeedbackAttachmentDto } from './dto/update-query-feedback-attachment.dto';

@Controller('query-feedback-attachments')
export class QueryFeedbackAttachmentsController {
  constructor(private readonly queryFeedbackAttachmentsService: QueryFeedbackAttachmentsService) {}

  @Post()
  create(@Body() createQueryFeedbackAttachmentDto: CreateQueryFeedbackAttachmentDto) {
    return this.queryFeedbackAttachmentsService.create(createQueryFeedbackAttachmentDto);
  }

  @Get()
  findAll() {
    return this.queryFeedbackAttachmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryFeedbackAttachmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQueryFeedbackAttachmentDto: UpdateQueryFeedbackAttachmentDto) {
    return this.queryFeedbackAttachmentsService.update(+id, updateQueryFeedbackAttachmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queryFeedbackAttachmentsService.remove(+id);
  }
}
