import { PartialType } from '@nestjs/swagger';
import { CreateQueryClaimAttachmentDto } from './create-query-claim-attachment.dto';

export class UpdateQueryClaimAttachmentDto extends PartialType(CreateQueryClaimAttachmentDto) {}
