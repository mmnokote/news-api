import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsEmail } from 'class-validator';
import { BaseEntity } from 'src/base-entity';

export class CreateUserDto extends BaseEntity {
  @ApiProperty({
    description: 'salutation',
  })
  @IsNotEmpty({ message: 'Salutation is missing.' })
  salutation: string;

  @ApiProperty({
    description: 'category',
  })
  @IsNotEmpty({ message: 'Registration category is missing.' })
  registationcategory: object;

  @ApiProperty({
    description: 'country',
  })
  @IsNotEmpty({ message: 'Country  is missing.' })
  country: object;

  @ApiProperty({
    description: 'organization',
  })
  @IsNotEmpty({ message: 'Organization is missing.' })
  organization: string;

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
  @IsNotEmpty({ message: 'Phone is missing.' })
  phone_number: string;

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

  @ApiProperty({
    description: 'description',
  })
  @IsNotEmpty({ message: 'Description is missing.' })
  description: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is missing.' })
  email: string;

  // @IsNotEmpty()
  // @ApiProperty({
  //   description: 'User country name',
  // })
  // @IsNotEmpty({ message: 'Country is missing.' })
  // countryId: number;
}
