import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity('files')
export class Fileupload extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, length: 1000 })
  name: string;

  @Column({ nullable: true })
  extension: string;

  @Column({ nullable: true })
  file_path: string;

  @OneToOne(() => User, (user) => user.fileupload, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  user: User;
}
