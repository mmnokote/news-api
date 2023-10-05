import { IsEmpty, IsNumber, IsString } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { Reader } from 'src/readers/entities/reader.entity';
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

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  @IsString({ always: true })
  @IsEmpty({ always: true })
  extension: string;

  @Column('int')
  @IsNumber()
  @IsEmpty({ always: true })
  size: number;

  //   @ManyToOne(() => Reader, (reader) => reader.books, {
  //     onDelete: 'CASCADE',
  //     eager: true,
  //   })
  //   reader: Reader;
}
