import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    return this.booksRepository.save(createBookDto);
  }

  findAll() {
    // const books = this.booksRepository.createQueryBuilder('book').getMany();
    // return books;
    // return this.booksRepository.find({
    //   relations: ['reader'],
    // });
    const id = 3;
    return this.booksRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.reader', 'reader')
      .where('reader.id = :readerId', { readerId: id })
      .getMany();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Book>> {
    const queryBuilder = this.booksRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Book>(queryBuilder, options);
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
