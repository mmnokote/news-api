import { BaseEntity } from 'src/base-entity';
import { Reader } from 'src/readers/entities/reader.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('meetings')
export class Meeting extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  email: string;

  @Column({ nullable: false })
  zoomUrl: string;

  @ManyToMany(() => Reader, (reader) => reader.meetings)
  attendees: Reader[];
}
