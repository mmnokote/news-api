import { Injectable } from '@nestjs/common';
import { CreateQueryDocumentTypeDto } from './dto/create-query-document-type.dto';
import { UpdateQueryDocumentTypeDto } from './dto/update-query-document-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueryDocumentType } from './entities/query-document-type.entity';

@Injectable()
export class QueryDocumentTypesService {
  constructor(
    @InjectRepository(QueryDocumentType)
    private queryDocumentTypeRepository: Repository<QueryDocumentType>,
  ) {}

  create(createQuerycategoryDto: CreateQueryDocumentTypeDto) {
    return this.queryDocumentTypeRepository.save(createQuerycategoryDto);
  }

  findAll() {
    return this.queryDocumentTypeRepository.find();
  }

  findAllById(d: number) {
    // console.log('mmmmmm', d);
    const categoryId = d;
    const is_claim = true;
    return (
      this.queryDocumentTypeRepository
        .createQueryBuilder('doctype')
        .leftJoinAndSelect('doctype.queryCategory', 'queryCategory')

        .where('is_claim = :is_claim', { is_claim: is_claim })
        // .where('queryCategory.id = :categoryId', {
        //   categoryId: categoryId,
        // })
        // .andWhere('is_claim = :is_claim', { is_claim: is_claim })
        .getMany()
    );
  }

  findAllNFQ() {
    const is_claim = false;
    return this.queryDocumentTypeRepository
      .createQueryBuilder('doctype')
      .leftJoinAndSelect('doctype.queryCategory', 'queryCategory')
      .where('is_claim = :is_claim', { is_claim: is_claim })
      .getMany();
  }

  findOne(id: number) {
    return this.queryDocumentTypeRepository.findOne(id);
  }

  update(id: number, updateQueryDocumentTypeDto: UpdateQueryDocumentTypeDto) {
    return this.queryDocumentTypeRepository.update(
      id,
      updateQueryDocumentTypeDto,
    );
  }

  remove(id: number) {
    return this.queryDocumentTypeRepository.delete(id);
  }
}
