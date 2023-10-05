import { BaseEntity } from 'src/base-entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { Query } from 'src/queries/entities/query.entity';
import { Column, Entity, JoinTable, OneToMany, ManyToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  first_name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  middle_name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  last_name: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  age: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  phone_number: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  nin_number: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  user_identification: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  sex: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1000,
    unique: true,
  })
  username: string;

  @Column({ type: 'varchar', nullable: true, default: 'Evlina@1990' })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  email: string;

  @OneToMany(() => Query, (query) => query.user, {})
  @JoinTable()
  queries: Query[];

  @ManyToMany(() => Menu, (menu) => menu.users, { eager: true })
  @JoinTable()
  menus: Menu[];
}
