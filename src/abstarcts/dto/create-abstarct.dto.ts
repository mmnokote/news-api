// create-abstarct.dto.ts

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/base-entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAbstarctDto extends BaseEntity {
  @IsEmail({}, { message: 'Email is missing or invalid.' })
  email: string;

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
    description: ' Presenting Author ',
  })
  @IsNotEmpty({ message: 'Presenting author is missing.' })
  presenting_author: string;

  @ApiProperty({
    description: 'Background',
  })
  @IsNotEmpty({ message: 'Background is missing.' })
  background: string;

  @ApiProperty({
    description: 'methodology',
  })
  @IsNotEmpty({ message: 'methodology is missing.' })
  methodology: string;

  @ApiProperty({
    description: 'results',
  })
  results: string;

  @ApiProperty({
    description: 'rejectionComment',
  })
  rejectionComment: string;

  @ApiProperty({
    description: 'subTheme',
  })
  @IsNotEmpty({ message: 'SubTheme is missing.' })
  subTheme: object;

  status: any;

  abstract: object;

  @ApiProperty({
    description: 'conclusion',
  })
  @IsNotEmpty({ message: 'Conclusion is missing.' })
  conclusion: string;

  @ApiProperty({
    description: 'recommendations',
  })
  @IsNotEmpty({ message: 'Recommendations is missing.' })
  recommendations: string;

  @IsNotEmpty({ message: 'Affiliation is missing.' })
  affiliation: string;

  @IsNotEmpty({ message: 'Objective is missing.' })
  objective: string;

  @ApiProperty({
    description: 'inline',
  })
  @IsNotEmpty({ message: 'Inline is missing.' })
  inline: string;
}
