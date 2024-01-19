import { PartialType } from '@nestjs/swagger';
import { CreateAbstarctDto } from './create-abstarct.dto';

export class UpdateAbstarctDto extends PartialType(CreateAbstarctDto) {}
