import { PartialType } from '@nestjs/swagger';
import { CreateFilelinkDto } from './create-filelink.dto';

export class UpdateFilelinkDto extends PartialType(CreateFilelinkDto) {}
