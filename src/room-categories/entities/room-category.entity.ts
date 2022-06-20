import { BaseEntity } from 'src/base-entity';
import { Room } from 'src/rooms/entities/room.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('room_categories')
export class RoomCategory extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Room, (room) => room.category)
  rooms: Room;
}
