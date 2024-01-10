import { PartialType } from '@nestjs/swagger';
import { CreateSubthemeDto } from './create-subtheme.dto';

export class UpdateSubthemeDto extends PartialType(CreateSubthemeDto) {}
