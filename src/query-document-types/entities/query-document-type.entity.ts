import { BaseEntity } from 'src/base-entity';
import { QueryCategory } from 'src/query-categories/entities/query-category.entity';
import { QueryClaimAttachment } from 'src/query-claim-attachments/entities/query-claim-attachment.entity';
import { QueryFeedbackAttachment } from 'src/query-feedback-attachments/entities/query-feedback-attachment.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('query_document_types')
export class QueryDocumentType extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  description: string;

  @Column({ type: 'boolean', nullable: false })
  is_claim: boolean;

  @ManyToOne(() => QueryCategory, (queryCategory) => queryCategory.query, {
    onDelete: 'CASCADE',
    eager: true,
  })
  queryCategory: QueryCategory;

  @Column({ nullable: true })
  queryCategoryId: number;

  @OneToMany(
    () => QueryClaimAttachment,
    (queryDocumentType) => queryDocumentType.queryDocumentType,
  )
  queryDocumentType: QueryClaimAttachment[];

  @OneToMany(
    () => QueryFeedbackAttachment,
    (queryDocumentType) => queryDocumentType.queryDocumentType,
  )
  queryDocumentFeedback: QueryFeedbackAttachment[];
}
