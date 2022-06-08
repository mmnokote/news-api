import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt, IsNumber } from 'class-validator';
import { BaseEntity } from 'src/base-entity';

export class CreateBookDto extends BaseEntity {
  @ApiProperty({
    name: 'Book name',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is missing.' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Book author',
  })
  author: string;

  @ApiProperty({
    description: 'Book release year',
  })
  @IsInt()
  @IsNotEmpty({ message: 'Release year is missing.' })
  releaseYear: number;

  @IsString()
  @ApiProperty({
    description: 'Book Description',
    type: String,
  })
  @IsString()
  description: string;

  @IsNotEmpty()
  sbn: string;

  @Expose()
  @IsNumber()
  readerId: number;
}
