import { BaseEntity } from 'src/base-entity';
import { Reader } from 'src/readers/entities/reader.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  author: string;

  @Column({ nullable: false })
  releaseYear: number;

  @Column({ type: 'varchar' })
  sbn: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  description: string;

  @ManyToOne(() => Reader, (reader) => reader.books, {
    onDelete: 'CASCADE',
    // eager: true,
  })
  reader: Reader;
}
