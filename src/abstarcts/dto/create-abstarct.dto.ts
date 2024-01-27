// create-abstarct.dto.ts

import { IsEmail } from 'class-validator';

export class CreateAbstarctDto {
  @IsEmail({}, { message: 'Email is missing or invalid.' })
  email: string;
}
