import { Injectable } from '@nestjs/common';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Query } from './entities/query.entity';
import { Repository, SelectQueryBuilder, getManager } from 'typeorm';
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
      // queryCategoryId: createQueryDto.queryCategoryId,
      description: createQueryDto.description,
      usersource: createQueryDto.usersource,
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
    return querydata;
  }
  async createFeedback(id, updateQueryDto) {
    const querydata: any = this.queriesRepository.create({
      queryCategoryId: updateQueryDto.queryCategoryId,
      usersource: updateQueryDto.usersource,
      description: updateQueryDto.description,
      queryofUserId: updateQueryDto.queryof_user_id,
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

  async findAll() {
    const entityManager = getManager();

    const rawQuery = `
  SELECT DISTINCT ON (q.id)
    q.id,
    q."createdAt" as created,
    q.description,
    q.tracknumber,
    qs.name as status,
    u.first_name as assignedToF,
    u.last_name as assignedToL,
    qc.name as category,
    ARRAY_AGG(qca.file_path) as queryClaimAttachments, 
    ARRAY_AGG(qdt.name) as documentTypes, 
    DATE_PART('day', NOW() - q."createdAt") AS days_passed
  FROM
    queries q

  LEFT JOIN
    queries_statuses qs 
  ON
    q."queryStatusId" = qs."id"
  LEFT JOIN
    query_categories qc 
  ON
    q."queryCategoryId" = qc."id"
  LEFT JOIN
    users u 
  ON
    q."userId" = u."id"
  LEFT JOIN
    query_claim_attachments qca 
  ON
    qca."queryId" = q.id
  LEFT JOIN
    query_document_types qdt 
  ON
    qca."queryDocumentTypeId" = qdt.id
  GROUP BY
    q.id, created, q.description, q.tracknumber, status, assignedToF, assignedToL, category, days_passed -- Group by all selected columns
  ORDER BY
    q.id;
`;

    const queries: any[] = await entityManager.query(rawQuery);

    return queries;
  }
  async findAllByCategory() {
    const entityManager = getManager();

    const rawQuery = `
  SELECT
    qc.name as category,
    COUNT(q.id) as record_count
FROM
    queries q
LEFT JOIN
    query_categories qc 
ON
    q."queryCategoryId" = qc."id"
GROUP BY
    qc.name
ORDER BY
    qc.name;
`;

    const queries: any[] = await entityManager.query(rawQuery);

    return queries;
  }

  async findAllByNature() {
    const entityManager = getManager();

    const rawQuery = `
  SELECT
    q.usersource as category,
    COUNT(q.id) as record_count
FROM
    queries q

GROUP BY
    q.usersource
ORDER BY
    q.usersource;
`;

    const queries: any[] = await entityManager.query(rawQuery);

    return queries;
  }
  async queryByGender() {
    const entityManager = getManager();

    const rawQuery = `
  SELECT
    u.sex as category,
    COUNT(u.id) as record_count
FROM
    queries q
JOIN
    users u 
ON
    q."queryofUserId" = u."id"
GROUP BY
    category
ORDER BY
    category DESC

`;

    const queries: any[] = await entityManager.query(rawQuery);

    return queries;
  }

  async querySummary() {
    const entityManager = getManager();

    const rawQuery = `
SELECT
    (SELECT COUNT(id) FROM queries WHERE "userId" IS NULL) AS pending_query_count,
(
  SELECT COUNT(id)
  FROM queries
  WHERE "userId" IS NOT NULL
    AND "feedbackdescription" IS NOT NULL
) AS replied_queries,
(
  SELECT COUNT(id)
  FROM queries
  WHERE "userId" IS NOT NULL
    AND "feedbackdescription" IS NULL
) AS underprocessing_queries,
    COUNT(id) AS total_query_count
FROM
    queries;

`;

    const queries: any[] = await entityManager.query(rawQuery);

    return queries;
  }

  async findAllTopFive() {
    const entityManager = getManager();

    const rawQuery = `
SELECT
    CONCAT(u.first_name, ' ', u.last_name) as category,
    COUNT(u.id) as record_count
FROM
    queries q
JOIN
    users u 
ON
    q."queryofUserId" = u."id"
GROUP BY
    category
ORDER BY
    record_count DESC
LIMIT 5;
`;

    const queries: any[] = await entityManager.query(rawQuery);

    return queries;
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
