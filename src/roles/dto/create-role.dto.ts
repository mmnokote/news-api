import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { BaseEntity } from 'typeorm';

export class CreateRoleDto extends BaseEntity {
  @ApiProperty({
    name: 'Book name',
  })
  @IsString()
  @IsNotEmpty({ message: 'Name is missing.' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'permissions',
  })
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'permissions',
  })
  permissions: [];
}
