import { BaseEntity } from 'src/base-entity';
import { Query } from 'src/queries/entities/query.entity';
import { QueryDocumentType } from 'src/query-document-types/entities/query-document-type.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('query_feedback_attachments')
export class QueryFeedbackAttachment extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  file_name: string;

  @Column({ type: 'varchar', nullable: false })
  file_path: string;

  @ManyToOne(() => Query, (query) => query.feedbackAttachment)
  query: Query;

  @ManyToOne(
    () => QueryDocumentType,
    (queryDocumentType) => queryDocumentType.queryDocumentFeedback,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  queryDocumentType: QueryDocumentType;

  @Column({ nullable: true })
  queryDocumentTypeId: number;
}
