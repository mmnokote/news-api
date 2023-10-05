import { PartialType } from '@nestjs/swagger';
import { CreateQueryDocumentTypeDto } from './create-query-document-type.dto';

export class UpdateQueryDocumentTypeDto extends PartialType(CreateQueryDocumentTypeDto) {}
