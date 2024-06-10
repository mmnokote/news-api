// src/likes/like.entity.ts
import { Abstarct } from 'src/abstarcts/entities/abstarct.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fcmToken: string;

  @Column()
  abstractId: number;

  @ManyToOne(() => Abstarct, (abstarct) => abstarct.likes)
  abstract: Abstarct;
}
