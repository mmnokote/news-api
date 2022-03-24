import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
  ) {}
  create(createContactDto: CreateContactDto) {
    return this.contactsRepository.create(createContactDto);
  }

  findAll() {
    return this.contactsRepository.find();
  }

  findOne(id: number) {
    return this.contactsRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateContactDto) {
    return this.contactsRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.contactsRepository.delete(id);
  }
}
