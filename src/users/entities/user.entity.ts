import { BaseEntity } from 'src/base-entity';
import { Column, Entity } from 'typeorm';

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

  @Column({ type: 'varchar', nullable: false, length: 1000, unique: true })
  email: string;
}
