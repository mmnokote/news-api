import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ReadersService } from 'src/readers/readers.service';
import { Permission } from 'src/roles/entities/role.enam';
import { PermissionsPost } from 'src/roles/permissions.decoretor';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readersService: ReadersService,
    @Inject('BOOK_SERVICE') private readonly booksClient: ClientProxy,
  ) {}

  @Post()
  @PermissionsPost(Permission.BOOKPOST)
  async create(@Body() createBookDto: CreateBookDto) {
    const reader = await this.readersService.findOne(createBookDto.readerId);
    if (!reader) {
      throw new NotFoundException(
        `Reader with id ${createBookDto.readerId} not found.`,
      );
    }
    const data = {
      ...createBookDto,
      reader,
    };

    return this.booksService
      .create(createBookDto, reader)
      .then((response) => {
        if (response) {
          this.booksClient.emit(
            'book_created',
            response,
            // new CreateUserEvent(createUserDto.email),
          );
          return response;
        }
      })
      .catch((error) => {
        throw new InternalServerErrorException();
      });
  }

  @Get()
  @PermissionsPost(Permission.BOOKGET)
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
