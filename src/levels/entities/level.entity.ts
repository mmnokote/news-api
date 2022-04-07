import { BaseEntity } from 'src/base-entity';
import { Category } from 'src/categories/entities/category.entity';
import { Entity, Column, OneToOne } from 'typeorm';

@Entity('levels')
export class Level extends BaseEntity {
  @Column()
  name: string;

  @OneToOne(() => Category, (category) => category.level)
  category: Category;
}
