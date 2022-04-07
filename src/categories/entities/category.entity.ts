import { Level } from 'src/levels/entities/level.entity';
import {
  Entity,
  Tree,
  Column,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
  TreeLevelColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @Column({ default: 'primary' })
  type: string;

  @OneToOne(() => Level, (level) => level.category)
  @JoinColumn()
  level: Level;
}
