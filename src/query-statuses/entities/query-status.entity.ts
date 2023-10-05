import { BaseEntity } from 'src/base-entity';
import { Query } from 'src/queries/entities/query.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('queries_statuses')
export class QueryStatus extends BaseEntity {
  @OneToMany(() => Query, (query) => query.queryStatus)
  query: Query[];

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  description: string;
}
