import { Module } from '@nestjs/common';
import { AbstarctsService } from './abstarcts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abstarct } from './entities/abstarct.entity';
import { AbstarctsController } from './abstarcts.controller';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Abstarct, User]), UsersModule],
  controllers: [AbstarctsController],
  providers: [AbstarctsService, UsersService],
  exports: [AbstarctsService],
})
export class AbstarctsModule {}
