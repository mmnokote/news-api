import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor() {}
}
