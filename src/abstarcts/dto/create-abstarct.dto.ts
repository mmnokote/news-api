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
  @IsString()
  @IsNotEmpty({ message: 'Title Name is missing.' })
  title: string;

  @ApiProperty({
    description: 'Author name',
  })
  @IsString()
  @IsNotEmpty({ message: 'Author Name is missing.' })
  author: string;

  @ApiProperty({
    description: ' Presenting Author ',
  })
  @IsString()
  @IsNotEmpty({ message: 'Presenting author is missing.' })
  presenting_author: string;

  @ApiProperty({
    description: 'Background',
  })
  @IsString()
  @IsNotEmpty({ message: 'Background is missing.' })
  background: string;

  @ApiProperty({
    description: 'methodology',
  })
  @IsString()
  @IsNotEmpty({ message: 'methodology is missing.' })
  methodology: string;

  @ApiProperty({
    description: 'results',
  })
  @IsString()
  @IsNotEmpty({ message: 'results is missing.' })
  results: string;

  @ApiProperty({
    description: 'subTheme',
  })
  @IsString()
  @IsNotEmpty({ message: 'SubTheme is missing.' })
  subTheme: string;

  @ApiProperty({
    description: 'conclusion',
  })
  @IsString()
  @IsNotEmpty({ message: 'Conclusion is missing.' })
  conclusion: string;

  @ApiProperty({
    description: 'recommendations',
  })
  @IsString()
  @IsNotEmpty({ message: 'Recommendations is missing.' })
  recommendations: string;

  @ApiProperty({
    description: 'inline',
  })
  @IsString()
  @IsNotEmpty({ message: 'Inline is missing.' })
  inline: string;
}
