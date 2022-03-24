export class CreateUserDto {
  id?: number;

  createdAt?: Date;

  updatedAt?: Date;

  first_name: string;

  middle_name: string;

  last_name: string;

  age: number;

  sex: string;

  email: string;
}
