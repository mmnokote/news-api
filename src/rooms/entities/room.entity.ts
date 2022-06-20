import { BaseEntity } from 'src/base-entity';
import { RoomCategory } from 'src/room-categories/entities/room-category.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('rooms')
export class Room extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => RoomCategory, (category) => category.rooms)
  category: RoomCategory;
}
