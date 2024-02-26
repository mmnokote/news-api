// import { Injectable } from '@nestjs/common';
// import { CreateAbstarctDto } from './dto/create-abstarct.dto';
// import { UpdateAbstarctDto } from './dto/update-abstarct.dto';

// @Injectable()
// export class AbstarctsService {
//   create(createAbstarctDto: CreateAbstarctDto) {
//     return 'This action adds a new abstarct';
//   }

// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

import { CreateAbstarctDto } from './dto/create-abstarct.dto';
import { UpdateAbstarctDto } from './dto/update-abstarct.dto';
import { Abstarct } from './entities/abstarct.entity';
import { User } from 'src/users/entities/user.entity';
import { EmailService } from 'src/mail.service';
import * as amqp from 'amqplib'; // Import amqplib

@Injectable()
export class AbstarctsService {
  constructor(
    @InjectRepository(Abstarct)
    private abstractRepository: Repository<Abstarct>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  // create(createAbstactDto: CreateAbstarctDto) {

  //   return this.abstractRepository.save(createAbstactDto);
  // }
  async create(createAbstactDto: CreateAbstarctDto) {
    const { email } = createAbstactDto;

    // Find user by email
    let user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new NotFoundException({
        message:
          'Invalid email provided. Please ensure you use the email address associated with your registration.',
      });
    }

    const abstractEntity: any = this.abstractRepository.create({
      email: createAbstactDto.email,
      title: createAbstactDto.title,
      author: createAbstactDto.author,
      affiliation: createAbstactDto.affiliation,
      presenting_author: createAbstactDto.presenting_author,
      background: createAbstactDto.background,
      objective: createAbstactDto.objective,
      methodology: createAbstactDto.methodology,
      results: createAbstactDto.results,
      subTheme: createAbstactDto.subTheme,
      conclusion: createAbstactDto.conclusion,
      recommendations: createAbstactDto.recommendations,
      inline: createAbstactDto.inline,
    });

    abstractEntity.user = user;
    // Save abstract to database
    return this.abstractRepository.save(abstractEntity);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Abstarct>> {
    const queryBuilder = this.abstractRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Abstarct>(queryBuilder, options);
  }

  async isEmailUnique(email: string): Promise<Abstarct | undefined> {
    return this.abstractRepository.findOne({ email });
  }

  async findAll() {
    const abstracts = await this.abstractRepository
      .createQueryBuilder('abstracts')
      .leftJoinAndSelect('abstracts.user', 'user')
      .leftJoinAndSelect('abstracts.subTheme', 'sub_theme')
      .getMany();
    return abstracts;
  }

  findOne(id: number) {
    return this.abstractRepository.findOne(id);
  }

  async update(id: number, updateQueryPriorityDto: UpdateAbstarctDto) {
    try {
      // if (updateQueryPriorityDto.status.code === 'AP') {
      //   updateQueryPriorityDto.rejectionComment = null;
      // }
      const result = await this.abstractRepository.update(
        id,
        updateQueryPriorityDto,
      );
      // Check if the update was successful
      if (result.affected > 0) {
        // Get the updated abstract to retrieve the email
        const updatedAbstract = await this.abstractRepository.findOne(id);
        if (!updatedAbstract) {
          throw new Error('Abstract not found');
        }
        console.log('updatedAbstract', updatedAbstract.status.name);
        // Send email with the password
        const body = {
          email: updatedAbstract.email,
          ststus: updatedAbstract.status.name,
          comment: updatedAbstract.rejectionComment,
        };
        await this.emailService.sendAbstarctApprovalEmail(body);
        return { message: 'Approval status set successful' };
      } else {
        return { message: 'Approval status set failed' };
      }
    } catch (error) {
      // Handle error if the update fails
      console.error('Approval Status failed:', error.message);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async emailSend() {
    try {
      // const connection = await amqp.connect('amqp://localhost');
      const connection = await amqp.connect(
        'amqp://rabbitmq:Passw0rd123@172.16.18.166:5672',
      );
      const channel = await connection.createChannel();
      const queue = 'email_queue';
      await channel.assertQueue(queue, { durable: true });

      // Fetch emails from the user repository
      const users = await this.userRepository.find();
      for (const user of users) {
        const message = JSON.stringify({
          email: user.email,
          comment: 'comment', // You can customize the comment here
        });
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
      }

      return { message: 'Mails sent successful' };
    } catch (error) {
      console.error('Failed to send emails:', error.message);
      throw error;
    }
  }

  remove(id: number) {
    return this.abstractRepository.delete(id);
  }
}
