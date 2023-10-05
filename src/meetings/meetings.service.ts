import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { UpdateMeetingDto } from './dto/update-meeting.dto';
import { Meeting } from './entities/meeting.entity';

@Injectable()
export class MeetingsService {
  constructor(
    @InjectRepository(Meeting)
    private contactsRepository: Repository<Meeting>,
  ) {}
  create(createMeetingDto: CreateMeetingDto) {
    return this.contactsRepository.create(createMeetingDto);
  }

  findAll() {
    return this.contactsRepository.find();
  }

  findOne(id: number) {
    return this.contactsRepository.findOne(id);
  }

  update(id: number, updateMeetingDto: UpdateMeetingDto) {
    return this.contactsRepository.update(id, updateMeetingDto);
  }

  remove(id: number) {
    return this.contactsRepository.delete(id);
  }
}
