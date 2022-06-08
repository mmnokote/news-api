import { Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';

@Entity('permissions')
export class Permission extends BaseEntity {
  @Column({ type: 'varchar', nullable: true, length: 1000 })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Role, (role) => role.permissions, {
    onDelete: 'CASCADE',
    nullable: true,
    // eager: true,
  })
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
