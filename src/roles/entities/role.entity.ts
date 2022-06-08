import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { Level } from 'src/levels/entities/level.entity';
import { Permission } from 'src/permissions/entities/permission.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, length: 1000 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Expose()
  @IsNumber()
  levelId: number;

  @ManyToOne(() => Level, (level) => level.roles, {
    onDelete: 'CASCADE',
    nullable: true,
    // eager: true,
  })
  level: Level;

  @ManyToMany(() => Permission, (perm) => perm.roles)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
