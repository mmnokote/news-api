import { Abstarct } from 'src/abstarcts/entities/abstarct.entity';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, OneToOne, OneToMany } from 'typeorm';

@Entity('subthemes')
export class Subtheme extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  code: string;

  @OneToMany(() => Abstarct, (abstract) => abstract.subTheme)
  abstract: Abstarct[];

  @OneToMany(() => User, (user) => user.subTheme)
  user: User[];
}
