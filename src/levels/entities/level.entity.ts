import { BaseEntity } from 'src/base-entity';
import { Category } from 'src/categories/entities/category.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Entity, Column, OneToOne, ManyToMany } from 'typeorm';

@Entity('levels')
export class Level extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', nullable: true })
  code: string;

  @OneToOne(() => Category, (category) => category.level)
  category: Category;

  @ManyToMany(() => Role, (role) => role.level)
  roles: Role[];
}
