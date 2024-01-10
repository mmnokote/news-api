import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  create(createBookDto: CreateCountryDto) {
    return this.countryRepository.save(createBookDto);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Country>> {
    const queryBuilder = this.countryRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Country>(queryBuilder, options);
  }

  findAll() {
    const countries = this.countryRepository.createQueryBuilder().getMany();
    return countries;

    // const id = 3;
    // return this.countryRepository
    //   .createQueryBuilder('countries')
    //   .leftJoinAndSelect('countries.reader', 'reader')
    //   .where('reader.id = :readerId', { readerId: id })
    //   .getMany();
  }

  findOne(id: number) {
    return this.countryRepository.findOne(id);
  }

  update(id: number, updateQueryPriorityDto: UpdateCountryDto) {
    return this.countryRepository.update(id, updateQueryPriorityDto);
  }

  remove(id: number) {
    return this.countryRepository.delete(id);
  }
}
