import { IsEmpty, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('files')
export class FileEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, length: 1000 })
  @IsString({ always: true })
  @IsEmpty({ always: true })
  original_name: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  @IsString({ always: true })
  @IsEmpty({ always: true })
  current_name: string;

  @Column({ type: 'varchar', nullable: true, length: 1000 })
  @IsString({ always: true })
  @IsEmpty({ always: true })
  dispaly_path: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  @IsString({ always: true })
  @IsEmpty({ always: true })
  extension: string;

  @Column('int')
  @IsNumber()
  @IsEmpty({ always: true })
  size: number;
}
