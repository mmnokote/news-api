import { PartialType } from '@nestjs/swagger';
import { CreateJisajiliDto } from './create-jisajili.dto';

export class UpdateJisajiliDto extends PartialType(CreateJisajiliDto) {}
