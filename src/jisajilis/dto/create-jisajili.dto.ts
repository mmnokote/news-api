// export class CreateJisajiliDto {}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsEmail } from 'class-validator';
import { BaseEntity } from 'src/base-entity';

export class CreateJisajiliDto extends BaseEntity {
  @ApiProperty({
    description: 'path file',
  })
  @IsString()
  @IsNotEmpty({ message: 'path is requred.' })
  path_file: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'status',
  })
  status: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '',
  })
  userId: number;
}
