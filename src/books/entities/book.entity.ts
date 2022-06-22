import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { Reader } from 'src/readers/entities/reader.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, length: 1000 })
  bookName: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  author: string;

  @Column({ nullable: true })
  releaseYear: string;

  @Column({ type: 'varchar' })
  sbn: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  readerId: number;

  @ManyToOne(() => Reader, (reader) => reader.books, {
    onDelete: 'CASCADE',
    nullable: true,
    eager: true,
  })
  reader: Reader;
}
