import { BaseEntity } from 'src/base-entity';
import { Query } from 'src/queries/entities/query.entity';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity('query_categories')
export class QueryCategory extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  description: string;

  @OneToMany(() => Query, (query) => query.queryCategory)
  query: Query[];
}
