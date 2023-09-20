import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({ description: 'Primary Key' })
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ nullable: true })
  createdAt?: Date;

  @CreateDateColumn({ nullable: true })
  updatedAt?: Date;

  @Column({ nullable: true })
  createdBy?: number;
}
