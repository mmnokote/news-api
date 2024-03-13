import { BaseEntity } from 'src/base-entity';
import { Status } from 'src/statuses/entities/status.entity';
import { Subtheme } from 'src/subthemes/entities/subtheme.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('abstracts')
export class Abstarct extends BaseEntity {
  // @OneToOne(() => User, (user) => user.abstract, {
  //   onDelete: 'CASCADE',
  //   eager: true,
  //   nullable: true,
  // })
  // @JoinColumn()
  // user: User;

  @ManyToOne(() => User, (user) => user.abstract)
  user: User;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  email: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  title: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  author: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  affiliation: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  presenting_author: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  background: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  objective: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  methodology: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  results: string;

  @ManyToOne(() => Status, (status) => status.abstract, {
    onDelete: 'CASCADE',
    eager: true,
  })
  status: Status;

  @ManyToOne(() => Subtheme, (subtheme) => subtheme.abstract, {
    onDelete: 'CASCADE',
    eager: true,
  })
  subTheme: Subtheme;

  @Column({ type: 'varchar', nullable: false })
  conclusion: string;

  @Column({ type: 'varchar', nullable: false })
  recommendations: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  inline: string;

  @Column({
    type: 'varchar',
    nullable: true,
    default: 'Abstract Accepted',
    length: 5000,
  })
  rejectionComment: string;
}
