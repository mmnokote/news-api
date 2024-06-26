import { Abstarct } from 'src/abstarcts/entities/abstarct.entity';
import { BaseEntity } from 'src/base-entity';
import { Country } from 'src/countries/entities/country.entity';
import { Jisajili } from 'src/jisajilis/entities/jisajili.entity';
import { Menu } from 'src/menus/entities/menu.entity';
import { Registartioncategory } from 'src/registartioncategories/entities/registartioncategory.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Subtheme } from 'src/subthemes/entities/subtheme.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  ManyToMany,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  first_name: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  middle_name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  last_name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  salutation: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  organization: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  group: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  description: string;

  // @Column({ type: 'varchar', nullable: true, length: 1000 })
  // age: string;

  @Column({ type: 'varchar', nullable: true, length: 1000, unique: false })
  phone_number: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  user_identification: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  sex: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  boothCategory: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1000,
    unique: true,
  })
  username: string;

  @Column({ type: 'varchar', nullable: true, default: 'Evlina@1990' })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 1000, unique: false })
  email: string;

  @ManyToMany(() => Role, (role) => role.user, { eager: true })
  @JoinTable()
  roles: Role[];

  @ManyToOne(() => Country, (country) => country.user, {
    onDelete: 'CASCADE',
    eager: true,
  })
  country: Country;

  @ManyToOne(() => Subtheme, (subtheme) => subtheme.user, {
    onDelete: 'CASCADE',
    eager: true,
  })
  subTheme: Subtheme;

  @OneToMany(() => Jisajili, (jisajili) => jisajili.user, { eager: true })
  jisajilis: Jisajili[];

  @OneToMany(() => Abstarct, (abstract) => abstract.user, { eager: true })
  abstract: Abstarct[];

  // @OneToOne(() => Abstarct, (abstract) => abstract.user)
  // abstract: Abstarct;

  @ManyToOne(
    () => Registartioncategory,
    (registationcategory) => registationcategory.user,
    {
      onDelete: 'CASCADE',
      eager: true,
      nullable: true,
    },
  )
  registationcategory: Registartioncategory;

  @ManyToMany(() => Menu, (menu) => menu.users, { eager: true })
  @JoinTable()
  menus: Menu[];

  @Column({ type: 'boolean', default: false })
  active: boolean;

  @Column({ type: 'boolean', default: false })
  verified: boolean;

  @Column({ type: 'boolean', default: false })
  mannual: boolean;
}
