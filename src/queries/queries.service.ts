import { Injectable } from '@nestjs/common';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from './entities/query.entity';
import { Repository } from 'typeorm';
import { QueryClaimAttachment } from 'src/query-claim-attachments/entities/query-claim-attachment.entity';
import { QueryClaimAttachmentsService } from 'src/query-claim-attachments/query-claim-attachments.service';
import { QueryFeedbackAttachment } from 'src/query-feedback-attachments/entities/query-feedback-attachment.entity';

@Injectable()
export class QueriesService {
  constructor(
    @InjectRepository(Query)
    private queriesRepository: Repository<Query>,
    private readonly queryClaimAttachmentsService: QueryClaimAttachmentsService,
    @InjectRepository(QueryClaimAttachment)
    private readonly queryClaimAttachmentsRepository: Repository<QueryClaimAttachment>,
    @InjectRepository(QueryFeedbackAttachment)
    private readonly queryFeedbackAttachmentRepository: Repository<QueryFeedbackAttachment>,
  ) {}

  async create(createQueryDto) {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000; // Generates a 4-digit random number

    const querydata: any = this.queriesRepository.create({
      queryCategoryId: createQueryDto.queryCategoryId,
      description: createQueryDto.description,
      queryofUserId: createQueryDto.queryof_user_id,
      tracknumber: 'MSIMBAZI' + randomNumber,
      queryStatusId: 1,
    });
    console.log('data', querydata);
    await this.queriesRepository.save(querydata);

    //upload query attachment for each files
    for (const item of createQueryDto.files) {
      const queryClaimAttachements =
        this.queryClaimAttachmentsRepository.create({
          queryDocumentTypeId: item.queryDocumentTypeId,
          file_name: item.file_path,
          file_path: item.file_path,
          query: querydata,
        });
      this.queryClaimAttachmentsRepository.save(queryClaimAttachements);
    }
  }
  async createFeedback(id, updateQueryDto) {
    const querydata: any = this.queriesRepository.create({
      queryCategoryId: updateQueryDto.queryCategoryId,
      description: updateQueryDto.description,
      queryofUserId: updateQueryDto.queryofUserId,
      tracknumber: updateQueryDto.tracknumber,
      feedbackdescription: updateQueryDto.feedbackdescription,
      userId: updateQueryDto.userId,
      closedAt: new Date(),
      queryStatusId: 3,
    });
    console.log('data', querydata);
    await this.queriesRepository.update(id, querydata);

    //upload query attachment for each files
    for (const item of updateQueryDto.files) {
      const queryClaimAttachements =
        this.queryFeedbackAttachmentRepository.create({
          queryDocumentTypeId: item.queryDocumentTypeId,
          file_name: item.file_path,
          file_path: item.file_path,
          query: updateQueryDto.query,
        });
      this.queryFeedbackAttachmentRepository.save(queryClaimAttachements);
    }
  }

  findAll() {
    return this.queriesRepository.find({
      // relations: ['claimAttachment'],
    });

    // const queries = this.queriesRepository
    //   .createQueryBuilder('queries')
    //   .getMany();
    // return queries;

    // const id = 3;
    // return this.queriesRepository
    //   .createQueryBuilder('queries')
    //   .leftJoinAndSelect('queries.reader', 'reader')
    //   .where('reader.id = :readerId', { readerId: id })
    //   .getMany();
  }

  findOne(id: number) {
    return this.queriesRepository.findOne(id);
  }

  async seachOne(data: string) {
    const tn = data;
    return this.queriesRepository
      .createQueryBuilder('query')
      .leftJoinAndSelect('query.queryCategory', 'queryCategory')
      .leftJoinAndSelect('query.queryStatus', 'queryStatus')
      .leftJoinAndSelect('query.feedbackAttachment', 'feedbackAttachment')
      .leftJoinAndSelect(
        'feedbackAttachment.queryDocumentType',
        'query.feedbackAttachment',
      )
      .where('query.tracknumber = :data', { data: tn })
      .getOne();

    // return this.usersRepository.findOne(id);
  }

  update(id: number, updateQueryDto: UpdateQueryDto) {
    return this.queriesRepository.update(id, updateQueryDto);
  }

  remove(id: number) {
    return this.queriesRepository.delete(id);
  }
}