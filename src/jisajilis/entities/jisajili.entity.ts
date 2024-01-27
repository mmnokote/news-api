// entities/jisajili.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/base-entity';
import { User } from 'src/users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity('jisajilis')
export class Jisajili extends BaseEntity {
  @ManyToOne(() => User, (user) => user.jisajilis)
  user: User;

  @Column({ type: 'varchar', default: false, nullable: false, length: 1000 })
  status: string;

  @Column()
  path_file: string;
}

// import { BaseEntity } from 'src/base-entity';
// import { User } from 'src/users/entities/user.entity';
// import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

// @Entity('jisajilis')
// export class Jisajili extends BaseEntity {
//   @ManyToOne(() => User, (user) => user.jisajilis)
//   user: User;

//   @Column({ type: 'varchar', default: false, nullable: false, length: 1000 })
//   status: boolean;

//   @Column({ type: 'varchar', nullable: false, length: 1000 })
//   path_file: string;
// }
