import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('abstracts')
export class Abstarct extends BaseEntity {
  //   @OneToOne(() => User, (user) => user.registationcategory)
  //   user: User;

  @Column({ type: 'varchar', nullable: false, length: 1000, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  title: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  author: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  affiliation: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  presenting_author: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  background: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  objective: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  methodology: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  results: string;
}
