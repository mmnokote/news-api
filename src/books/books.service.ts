import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
// import { ReadersService } from 'src/readers/readers.service';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  private schedulerRegistry: SchedulerRegistry;

  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto, reader): Promise<Book> {
    const newPost = await this.booksRepository.create({
      ...createBookDto,
      reader,
    });
    await this.booksRepository.save(newPost);
    return newPost;
  }

  @Cron('0 0 9 * * *', {
    name: 'myJob',
  })
  handleCron() {
    this.findAll().then((res) => {
      console.log('Called when the current second is 45', res);
    });
  }

  findAll() {
    const id = 21;
    // return this.booksRepository.find({
    //   relations: ['reader'],
    // });

    const data = this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.reader', 'reader')
      .where('reader.id = :readerId', { readerId: id })
      .getMany();
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksRepository.update(id, updateBookDto);
  }

  remove(id: number) {
    return this.booksRepository.delete(id);
  }
}
