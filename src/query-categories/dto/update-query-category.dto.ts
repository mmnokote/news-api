import { PartialType } from '@nestjs/swagger';
import { CreateQueryCategoryDto } from './create-query-category.dto';

export class UpdateQueryCategoryDto extends PartialType(CreateQueryCategoryDto) {}
