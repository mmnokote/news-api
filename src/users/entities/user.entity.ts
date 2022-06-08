import { BaseEntity } from 'src/base-entity';
import { Fileupload } from 'src/fileuploads/entities/fileupload.entity';
import { Role } from 'src/roles/entities/role.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
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
  age: number;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  sex: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 1000,
    default: 'mm',
  })
  username: string;

  @Column({ type: 'varchar', nullable: true, default: 'Evlina@1990' })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: 1000, unique: true })
  email: string;

  @OneToOne(() => Fileupload, (file) => file.user, {})
  fileupload: Fileupload;

  @ManyToMany(() => Role, (user) => user.users)
  @JoinTable()
  roles: Role[];
}
