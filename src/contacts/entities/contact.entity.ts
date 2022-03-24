import { BaseEntity } from 'src/base-entity';
import { Reader } from 'src/readers/entities/reader.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('contacts')
export class Contact extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column()
  readerId: number;

  @OneToOne(() => Reader, (reader) => reader.contact, { onDelete: 'CASCADE' })
  @JoinColumn()
  reader: Reader;
}
