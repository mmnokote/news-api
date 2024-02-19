import { BaseEntity } from 'src/base-entity';

import { User } from 'src/users/entities/user.entity';
import { Entity, Column, ManyToMany } from 'typeorm';

@Entity('menus')
export class Menu extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, length: 1000 })
  description: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  name: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  state: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  url: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  icon: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  code: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  uid: string;

  @ManyToMany(() => User, (user) => user.menus)
  users: User[];
}
