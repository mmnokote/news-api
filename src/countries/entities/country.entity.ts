import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity('countries')
export class Country extends BaseEntity {
  // @OneToOne(() => User, (user) => user.country)
  // user: User;

  @OneToMany(() => User, (user) => user.country)
  user: User[];

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  code: string;
}
