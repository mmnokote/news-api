import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books/entities/book.entity';
import { Contact } from './contacts/entities/contact.entity';
import { Meeting } from './meetings/entities/meeting.entity';
import { Reader } from './readers/entities/reader.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
    @InjectRepository(Meeting)
    private meetingsRepository: Repository<Meeting>,
    @InjectRepository(Reader)
    private readersRepository: Repository<Reader>,
  ) {}

  async seeder() {
    //create CEO Reader
    const ceo = this.readersRepository.create({
      name: 'Mnokote',
      description: 'CEO',
    });

    //Create Books
    const book1 = this.booksRepository.create({
      bookName: 'How to make money',
      description: 'Mony Dillers55',
      author: 'Mawazo Jonasi',
      releaseYear: '20003',
      sbn: 'NKOMN12',
    });
    await this.booksRepository.save(book1);

    const book2 = this.booksRepository.create({
      bookName: 'How code Nest JS',
      description: 'Become a Node gurru4',
      author: 'Mtonyi shalungu',
      releaseYear: '20003',
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

    const ceoContactInfo = this.contactsRepository.create({
      email: 'mmnokote@gmail.com',
      phone: '123',
      // readerId: ceo.id, you can do this also
    });

    //save CEO contact Info
    ceoContactInfo.reader = ceo;
    await this.contactsRepository.save(ceoContactInfo);
  }
}
