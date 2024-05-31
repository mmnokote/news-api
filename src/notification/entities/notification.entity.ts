import { Abstarct } from 'src/abstarcts/entities/abstarct.entity';
import { BaseEntity } from 'src/base-entity';
import { Entity, Column, OneToOne, OneToMany } from 'typeorm';

@Entity('notifications')
export class Notification extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  fcmToken: string;
}
