import { BaseEntity } from 'src/base-entity';
import { Query } from 'src/queries/entities/query.entity';
import { QueryDocumentType } from 'src/query-document-types/entities/query-document-type.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('query_claim_attachments')
export class QueryClaimAttachment extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  file_name: string;

  @Column({ type: 'varchar', nullable: false })
  file_path: string;

  @ManyToOne(
    () => QueryDocumentType,
    (attachmentType) => attachmentType.queryDocumentType,
    {
      onDelete: 'CASCADE',
      eager: true,
    },
  )
  queryDocumentType: QueryDocumentType;

  @Column({ nullable: true })
  queryDocumentTypeId: number;

  @ManyToOne(() => Query, (query) => query.claimAttachment, {
    onDelete: 'CASCADE',
  })
  query: Query;
}
