import { BaseEntity } from 'src/base-entity';
import { Status } from 'src/statuses/entities/status.entity';
import { Subtheme } from 'src/subthemes/entities/subtheme.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity('abstracts')
export class Abstarct extends BaseEntity {
  @OneToOne(() => User, (user) => user.abstract, {
    onDelete: 'CASCADE',
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  user: User;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
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

  @Column({ type: 'varchar', nullable: true, length: 1000 })
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

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  inline: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  rejectionComment: string;
}
