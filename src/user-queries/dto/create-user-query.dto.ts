import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateUserQueryDto {
  user_id: any;

  queryId: any;

  queryCategoryId: any;
}
