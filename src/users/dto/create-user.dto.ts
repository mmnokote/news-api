import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsEmail } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    description: 'User second name',
  })
  middle_name: string;

  @ApiProperty({
    description: 'User last name',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    description: 'User age',
    type: Number,
  })
  @IsInt()
  age: number;

  @ApiProperty({
    description: 'User gendar',
  })
  sex: string;

  @ApiProperty({
    description: 'User email',
  })
  @IsEmail()
  email: string;
}
