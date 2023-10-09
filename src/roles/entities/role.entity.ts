import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  description: string;

  @ManyToMany(() => User, (user) => user.roles)
  user: User[];
}
