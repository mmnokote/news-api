// create-abstarct.dto.ts

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAbstarctDto extends BaseEntity {
  @ApiProperty({
    description: 'Title',
  })
  @IsNotEmpty({ message: 'Title Name is missing.' })
  title: string;

  @ApiProperty({
    description: 'Author name',
  })
  @IsNotEmpty({ message: 'Author Name is missing.' })
  author: string;

  @ApiProperty({
    description: 'description',
  })
  @IsNotEmpty({ message: 'description is missing.' })
  description: string;

  @ApiProperty({
    description: 'content',
  })
  @IsNotEmpty({ message: 'content is missing.' })
  content: string;

  @ApiProperty({
    description: 'subTheme',
  })
  @IsNotEmpty({ message: 'SubTheme is missing.' })
  subTheme: object;

  status: any;

  abstract: object;

  userId: any;
}
