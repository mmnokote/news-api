import { BaseEntity } from 'src/base-entity';
import { QueryCategory } from 'src/query-categories/entities/query-category.entity';
import { QueryClaimAttachment } from 'src/query-claim-attachments/entities/query-claim-attachment.entity';
import { QueryFeedbackAttachment } from 'src/query-feedback-attachments/entities/query-feedback-attachment.entity';
import { QueryStatus } from 'src/query-statuses/entities/query-status.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  ManyToOne,
  ManyToMany,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('queries')
export class Query extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, length: 1000 })
  description: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  feedbackdescription: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  uid: string;

  @ManyToOne(() => QueryCategory, (queryCategory) => queryCategory.query, {
    onDelete: 'CASCADE',
    eager: true,
  })
  queryCategory: QueryCategory;

  @ManyToOne(() => QueryStatus, (queryStatus) => queryStatus.query, {
    onDelete: 'CASCADE',
    eager: true,
  })
  queryStatus: QueryStatus;

  @ManyToOne(() => User, (user) => user.queries, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;
  @Column({ nullable: true })
  userId: number;
  @Column({ nullable: true })
  queryCategoryId: number;

  @Column({ nullable: true })
  queryStatusId: number;

  @Column({ type: 'int', nullable: true })
  queryofUserId: number;

  @Column({ nullable: true })
  tracknumber: string;

  @Column({ nullable: true })
  usersource: string;

  @OneToMany(
    () => QueryClaimAttachment,
    (claimAttachment) => claimAttachment.query,
    { onDelete: 'CASCADE', eager: true },
  )
  claimAttachment: QueryClaimAttachment[];

  @OneToMany(
    () => QueryFeedbackAttachment,
    (queryFeedbackAttachment) => queryFeedbackAttachment.query,
    { onDelete: 'CASCADE', eager: true },
  )
  feedbackAttachment: QueryFeedbackAttachment[];

  @Column({ nullable: true })
  closedAt?: Date;
}
