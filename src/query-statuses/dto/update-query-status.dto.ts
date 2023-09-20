import { PartialType } from '@nestjs/swagger';
import { CreateQueryStatusDto } from './create-query-status.dto';

export class UpdateQueryStatusDto extends PartialType(CreateQueryStatusDto) {}
