import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsEmail } from 'class-validator';
import { BaseEntity } from 'src/base-entity';

export class CreateUserDto extends BaseEntity {
  @ApiProperty({
    description: 'User first name',
  })
  @IsString()
  @IsNotEmpty({ message: 'First Name is missing.' })
  first_name: string;

  @ApiProperty({
    description: 'User second name',
  })
  middle_name: string;

  @ApiProperty({
    description: 'User last name',
  })
  @IsString()
  @IsNotEmpty({ message: 'Last Name is missing.' })
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
  @ApiProperty({
    description: 'Username',
  })
  username: string;

  @ApiProperty({
    description: 'Password',
  })
  password: string;

  @IsEmail()
  email: string;
}
