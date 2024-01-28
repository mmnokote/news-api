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

  @IsNotEmpty({ message: 'Middle Name is missing.' })
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
    description: 'User sex',
  })
  @IsNotEmpty({ message: 'Sex is missing.' })
  sex: string;

  @ApiProperty({
    description: 'User Identification',
  })
  user_identification: string;

  @ApiProperty({
    description: 'User name',
  })
  @ApiProperty({
    description: 'Username',
  })
  @IsNotEmpty({ message: 'Username is missing.' })
  username: string;

  @ApiProperty({
    description: 'Password',
  })
  @IsNotEmpty({ message: 'Password is missing.' })
  password: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is missing.' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'User country name',
  })
  @IsNotEmpty({ message: 'Country is missing.' })
  countryId: number;
}
