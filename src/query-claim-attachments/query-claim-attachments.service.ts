import { Injectable } from '@nestjs/common';
import { CreateQueryClaimAttachmentDto } from './dto/create-query-claim-attachment.dto';
import { UpdateQueryClaimAttachmentDto } from './dto/update-query-claim-attachment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryClaimAttachment } from './entities/query-claim-attachment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QueryClaimAttachmentsService {
  constructor(
    @InjectRepository(QueryClaimAttachment)
    private readonly queryClaimAttachmentsRepository: Repository<QueryClaimAttachment>,
  ) {}

  create(createQueryClaimAttachmentDto: CreateQueryClaimAttachmentDto) {
    return 'This action adds a new queryClaimAttachment';
  }

  findAll() {
    return `This action returns all queryClaimAttachments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} queryClaimAttachment`;
  }

  update(
    id: number,
    updateQueryClaimAttachmentDto: UpdateQueryClaimAttachmentDto,
  ) {
    return `This action updates a #${id} queryClaimAttachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} queryClaimAttachment`;
  }
}
