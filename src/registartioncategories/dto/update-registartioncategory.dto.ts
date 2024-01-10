import { PartialType } from '@nestjs/swagger';
import { CreateRegistartioncategoryDto } from './create-registartioncategory.dto';

export class UpdateRegistartioncategoryDto extends PartialType(CreateRegistartioncategoryDto) {}
