import { SetMetadata } from '@nestjs/common';

export const PermissionsPost = (...post: string[]) =>
  SetMetadata('permissions', post);
