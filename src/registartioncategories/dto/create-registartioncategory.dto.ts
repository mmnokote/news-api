import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/base-entity';

export class CreateRegistartioncategoryDto extends BaseEntity {
  @IsNotEmpty({ message: 'Name is missing.' })
  @IsString()
  @ApiProperty({
    description: 'User second name',
  })
  name: string;

  @IsNotEmpty({ message: 'Code is missing.' })
  @IsString()
  @ApiProperty({
    description: 'Code',
  })
  code: string;

  @ApiProperty({
    description: 'User last name',
  })
  @IsString()
  description: string;
}
