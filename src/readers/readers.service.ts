import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';
import { Reader } from './entities/reader.entity';

@Injectable()
export class ReadersService {
  constructor(
    @InjectRepository(Reader)
    private readersRepository: Repository<Reader>,
  ) {}

  create(createReaderDto: CreateReaderDto) {
    return this.readersRepository.save(createReaderDto);
  }

  findAll() {
    return this.readersRepository.find({
      relations: ['books'],
    });
  }

  findOne(id: number) {
    return this.readersRepository.findOne(id);
  }

  update(id: number, updateReaderDto: UpdateReaderDto) {
    return this.readersRepository.update(id, updateReaderDto);
  }

  remove(id: number) {
    return this.readersRepository.delete(id);
  }
}
