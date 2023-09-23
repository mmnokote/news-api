import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books/entities/book.entity';
import { Meeting } from './meetings/entities/meeting.entity';
import { Reader } from './readers/entities/reader.entity';
// import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,

    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
    @InjectRepository(Reader)
    private readersRepository: Repository<Reader>, // private readonly mailerService: MailerService,
  ) {}

  // sendMail() {
  //   this.mailerService.sendMail({
  //     to: 'tkibiriti@gmail.com',
  //     from: 'mmnokote@gmail.com',
  //     subject: 'TEST',
  //     text: 'WOOZA',
  //     html: '<b> wellcome to the mail nest</b>',
  //   });
  // }

  async seeder() {
    //create CEO Reader
    const ceo = this.readersRepository.create({
      name: 'Mnokote',
      description: 'CEO',
    });

    //Create Books
    const book1 = this.booksRepository.create({
      name: 'How to make money',
      description: 'Mony Dillers55',
      author: 'Mawazo Jonasi',
      releaseYear: 20003,
      sbn: 'NKOMN12',
    });
    await this.booksRepository.save(book1);

    const book2 = this.booksRepository.create({
      name: 'How code Nest JS',
      description: 'Become a Node gurru4',
      author: 'Mtonyi shalungu',
      releaseYear: 20003,
      sbn: 'MN13NKO',
    });
    await this.booksRepository.save(book2);

    //map books to reader
    ceo.books = [book1, book2];
    await this.readersRepository.save(ceo);

    //create Manager  to Reader
    const director = this.readersRepository.create({
      name: 'Anselm',
      description: 'Manager',
      manager: ceo,
    });

    await this.readersRepository.save(director);

    //meetings to CEO and Director
    const meeting1 = this.meetingsRepository.create({
      zoomUrl: 'Meting 1',
      email: '',
    });
    meeting1.attendees = [ceo, director];
    await this.meetingsRepository.save(meeting1);
  }
}
