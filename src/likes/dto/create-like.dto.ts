import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLikeDto {
  @ApiProperty({
    description: 'News',
  })
  abstract: string;

  @ApiProperty({
    description: 'fcmToken',
  })
  @IsNotEmpty({ message: 'fcmToken is missing.' })
  fcmToken: string;
}
