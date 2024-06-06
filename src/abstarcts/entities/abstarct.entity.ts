import { BaseEntity } from 'src/base-entity';
import { Like } from 'src/likes/entities/like.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { Subtheme } from 'src/subthemes/entities/subtheme.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity('abstracts')
export class Abstarct extends BaseEntity {
  @ManyToOne(() => User, (user) => user.abstract)
  user: User;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  title: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  author: string;

  @Column({ type: 'varchar', nullable: true, length: 5000 })
  description: string;

  @Column({ type: 'varchar', nullable: true, length: 5000, default: 'null' })
  url: string;

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

  @Column({ nullable: true })
  urlToImage: string;

  @Column({ nullable: true })
  display_path: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ default: false })
  published: boolean;

  @OneToMany(() => Like, (like) => like.abstract)
  likes: Like[];
}
