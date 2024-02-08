import { BaseEntity } from 'src/base-entity';
import { Country } from 'src/countries/entities/country.entity';
import { Jisajili } from 'src/jisajilis/entities/jisajili.entity';
import { Registartioncategory } from 'src/registartioncategories/entities/registartioncategory.entity';
import { Role } from 'src/roles/entities/role.entity';
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

  @Column({ type: 'varchar', nullable: false, length: 1000 })
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

  @Column({ type: 'varchar', nullable: true, length: 1000, unique: true })
  phone_number: string;

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

  @Column({ type: 'varchar', nullable: false, length: 1000, unique: true })
  email: string;

  @ManyToMany(() => Role, (role) => role.user, { eager: true })
  @JoinTable()
  roles: Role[];

  @ManyToOne(() => Country, (country) => country.user, {
    onDelete: 'CASCADE',
    eager: true,
  })
  country: Country;

  @OneToMany(() => Jisajili, (jisajili) => jisajili.user, { eager: true })
  jisajilis: Jisajili[];

  // @OneToOne(
  //   () => Registartioncategory,
  //   (registationcategory) => registationcategory.user,
  //   {
  //     onDelete: 'CASCADE',
  //     eager: true,
  //   },
  // )
  // @JoinColumn()
  // registationcategory: Registartioncategory;

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
}
