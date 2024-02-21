import { Module } from '@nestjs/common';
import { AbstarctsService } from './abstarcts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Abstarct } from './entities/abstarct.entity';
import { AbstarctsController } from './abstarcts.controller';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { EmailService } from 'src/mail.service';
import { TwilioService } from 'twilio.service';

@Module({
  imports: [TypeOrmModule.forFeature([Abstarct, User]), UsersModule],
  controllers: [AbstarctsController],
  providers: [AbstarctsService, UsersService, EmailService, TwilioService],
  exports: [AbstarctsService],
})
export class AbstarctsModule {}
