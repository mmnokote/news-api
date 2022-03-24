import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Primary Key',
  })
  id?: number;

  createdAt?: Date;

  updatedAt?: Date;

  @ApiProperty({
    description: 'User first name',
  })
  first_name: string;

  @ApiProperty({
    description: 'User second name',
  })
  middle_name: string;

  @ApiProperty({
    description: 'User last name',
  })
  last_name: string;

  @ApiProperty({
    description: 'User age',
    type: Number,
  })
  age: number;

  @ApiProperty({
    description: 'User gendar',
  })
  sex: string;

  @ApiProperty({
    description: 'User email',
  })
  email: string;
}
