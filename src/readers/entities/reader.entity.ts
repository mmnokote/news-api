import { BaseEntity } from 'src/base-entity';
import { Book } from 'src/books/entities/book.entity';
import { Meeting } from 'src/meetings/entities/meeting.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('readers')
export class Reader extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  description: string;

  @Column({ nullable: true })
  managerId: number;

  @ManyToOne(() => Reader, (reader) => reader.readers, {
    onDelete: 'SET NULL',
  })
  manager: Reader;

  @OneToMany(() => Reader, (reader) => reader.manager)
  readers: Reader[];

  @OneToMany(() => Book, (book) => book.reader)
  books: Book[];

  @ManyToMany(() => Meeting, (meeting) => meeting.attendees)
  @JoinTable()
  meetings: Meeting[];
}
