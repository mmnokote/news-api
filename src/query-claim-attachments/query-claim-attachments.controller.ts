import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QueryClaimAttachmentsService } from './query-claim-attachments.service';
import { CreateQueryClaimAttachmentDto } from './dto/create-query-claim-attachment.dto';
import { UpdateQueryClaimAttachmentDto } from './dto/update-query-claim-attachment.dto';

@Controller('query-claim-attachments')
export class QueryClaimAttachmentsController {
  constructor(
    private readonly queryClaimAttachmentsService: QueryClaimAttachmentsService,
  ) {}

  @Post()
  create(@Body() createQueryClaimAttachmentDto: CreateQueryClaimAttachmentDto) {
    return this.queryClaimAttachmentsService.create(
      createQueryClaimAttachmentDto,
    );
  }

  @Get()
  findAll() {
    return this.queryClaimAttachmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryClaimAttachmentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQueryClaimAttachmentDto: UpdateQueryClaimAttachmentDto,
  ) {
    return this.queryClaimAttachmentsService.update(
      +id,
      updateQueryClaimAttachmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queryClaimAttachmentsService.remove(+id);
  }
}
