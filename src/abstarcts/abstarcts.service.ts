import { Abstract, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
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
import { getRepository, IsNull } from 'typeorm';
import { Notification } from '../notification/entities/notification.entity';
import { FirebaseAdminService } from '../firebase/firebase-admin.service';

@Injectable()
export class AbstarctsService {
  constructor(
    @InjectRepository(Abstarct)
    private abstractRepository: Repository<Abstarct>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly emailService: EmailService,

    @InjectRepository(Notification)
    private readonly notificationsRepository: Repository<Notification>,
    private readonly firebaseAdminService: FirebaseAdminService,
  ) {}

  async sendNotificationsForAbstract(abstractId: string): Promise<void> {
    const abstract = await this.abstractRepository.findOne(abstractId);

    if (!abstract) {
      throw new NotFoundException('Article not found');
    }

    const notifications = await this.notificationsRepository.find();

    const notificationData = {
      title: 'New Article Published', // You can customize this title as needed
      body: abstract.title,
    };

    for (const notification of notifications) {
      await this.firebaseAdminService.sendNotification(
        notification.fcmToken,
        notificationData.title,
        notificationData.body,
      );
    }
  }

  async create(createAbstactDto: CreateAbstarctDto) {
    const abstractEntity: any = this.abstractRepository.create({
      title: createAbstactDto.title,
      author: createAbstactDto.author,
      description: createAbstactDto.description,
      subTheme: createAbstactDto.subTheme,
      content: createAbstactDto.content,
      url: createAbstactDto.url,
    });
    // Save abstract to database

    return this.abstractRepository.save(abstractEntity);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Abstarct>> {
    const queryBuilder = this.abstractRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Abstarct>(queryBuilder, options);
  }

  async findAll() {
    const abstracts = await this.abstractRepository
      .createQueryBuilder('abstracts')
      .leftJoinAndSelect('abstracts.user', 'user')
      .leftJoinAndSelect('abstracts.subTheme', 'sub_theme')

      .getMany();
    return abstracts;
  }

  async getAbstractData(): Promise<any> {
    const abstracts = await this.abstractRepository.find();

    return {
      status: 'ok',
      totalResults: abstracts.length,
      articles: abstracts.map((abstract) => ({
        source: {
          id: null,
          name: abstract.subTheme.name, // Assuming Subtheme has a name property
        },
        author: abstract.author,
        title: abstract.title,
        description: abstract.description,
        url: abstract.url,
        urlToImage: abstract.urlToImage,
        publishedAt: abstract.createdAt.toISOString(),
        content: abstract.content,
      })),
    };
  }

  // async findAllMyAbs(req: any) {
  //   // console.log('req', req.user.id);
  //   const id = req.user.id;
  //   const abstracts = await this.abstractRepository
  //     .createQueryBuilder('abstracts')
  //     .leftJoinAndSelect('abstracts.user', 'user')
  //     .leftJoinAndSelect('abstracts.subTheme', 'sub_theme')
  //     .where('abstracts.userId = :id', { id })
  //     .getMany();
  //   return abstracts;
  // }

  async findAllMyAbs(req: any, query: string) {
    let queryBuilder = this.abstractRepository
      .createQueryBuilder('abstracts')
      .leftJoinAndSelect('abstracts.user', 'user')
      .leftJoinAndSelect('abstracts.subTheme', 'sub_theme');

    if (query) {
      // Add additional condition to the query where subTheme name is equal to the query parameter
      queryBuilder = queryBuilder.andWhere('sub_theme.name = :name', {
        name: query,
      });
    }

    const abstracts = await queryBuilder.getMany();

    return {
      status: 'ok',
      totalResults: abstracts.length,
      articles: abstracts.map((abstract) => ({
        source: {
          id: null,
          name: abstract.subTheme.name, // Assuming Subtheme has a name property
        },
        author: abstract.author,
        title: abstract.title,
        description: abstract.description,
        url: abstract.url,
        urlToImage: abstract.urlToImage,
        publishedAt: abstract.createdAt.toISOString(),
        content: abstract.content,
      })),
    };
  }

  findOne(id: number) {
    return this.abstractRepository.findOne(id);
  }

  async update(id: number, updateQueryPriorityDto: UpdateAbstarctDto) {
    try {
      if (
        updateQueryPriorityDto.status &&
        updateQueryPriorityDto.status.code === 'AP'
      ) {
        updateQueryPriorityDto = updateQueryPriorityDto;
      }
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
        console.log('updatedAbstract title', updatedAbstract.title);
        // Send email with the password
        if (updatedAbstract.status) {
          const body = {
            ststus: updatedAbstract.status.name,
            title: updatedAbstract.title,
          };
          // console.log('dataaaaa', body);
          if (body.ststus == 'Rejected') {
            await this.emailService.sendAbstarctApprovalEmailR(body);
          }
          if (body.ststus == 'Accepted') {
            await this.emailService.sendAbstarctApprovalEmailA(body);
          }
        }
        if (updatedAbstract.status) {
          return { message: 'Approval status set successful' };
        } else if (!updatedAbstract.status) {
          return { message: 'Abstract updated  successful' };
        }
      } else {
        return { message: 'Approval Status failed' };
      }
    } catch (error) {
      // Handle error if the update fails
      console.error('Approval Status failed:', error.message);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  async updateFromUser(id: number, updateQueryPriorityDto: UpdateAbstarctDto) {
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
        // console.log('updatedAbstract', updatedAbstract.status.name);
        // Send email with the password
        // const body = {
        //   email: updatedAbstract.email,
        //   ststus: updatedAbstract.status.name,
        //   comment: updatedAbstract.rejectionComment,
        // };
        // await this.emailService.sendAbstarctApprovalEmail(body);
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

  async emailSendForAbstract(createDataDto) {
    try {
      // const connection = await amqp.connect('amqp://localhost');
      const connection = await amqp.connect(
        'amqp://rabbitmq:Passw0rd123@172.16.18.166:5672',
      );
      const channel = await connection.createChannel();
      const queue = 'email_queue';
      await channel.assertQueue(queue, { durable: true });

      // Fetch emails from the user repository

      const entityManager = getManager();

      const rawQuery = `
    SELECT DISTINCT ON (a.id)
      a."userId" FROM
    abstracts a
      WHERE a."rejectionComment" = 'Abstract Accepted'
    ;
  `;

      const abstracts: any[] = await entityManager.query(rawQuery);

      const userIds = abstracts.map((abstract) => abstract.userId);
      console.log('userIds', userIds);
      const users = await this.userRepository.findByIds(userIds);

      for (const user of users) {
        const message = JSON.stringify({
          email: user.email,
          comment: createDataDto.body, // You can customize the comment here
          code: 'NOTIFICATION',
        });
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
      }

      return { message: 'Mails sent successful' };
    } catch (error) {
      console.error('Failed to send emails:', error.message);
      throw error;
    }
  }

  async emailSend(createDataDto) {
    try {
      // const connection = await amqp.connect('amqp://localhost');
      const connection = await amqp.connect(
        'amqp://rabbitmq:Passw0rd123@172.16.18.166:5672',
      );
      const channel = await connection.createChannel();
      const queue = 'email_queue';
      await channel.assertQueue(queue, { durable: true });

      // Fetch emails from the user repository
      const users = await this.userRepository
        .createQueryBuilder('user')
        .leftJoin('user.jisajilis', 'jisajili')
        .where('user.active = :active', { active: false })
        .andWhere('jisajili.id IS NULL')
        .getMany();
      // console.log('users', users);

      for (const user of users) {
        const message = JSON.stringify({
          email: user.email,
          comment: '', // You can customize the comment here
          code: 'PAYMENTREMIDER',
        });
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
      }

      return { message: 'Mails sent successful' };
    } catch (error) {
      console.error('Failed to send emails:', error.message);
      throw error;
    }
  }

  async filterAbstracts(data: string) {
    const entityManager = getManager();

    const rawQuery = `
    SELECT
      a.id,
      a."email" as email,
      a."author" as author,
      a."title" as title,
      json_build_object(
        'first_name', u.first_name,
        'last_name', u.last_name
      ) as user,
      json_build_object(
        'name', st.name
      ) as sub_theme
    FROM abstracts a
    LEFT JOIN users u ON a."userId" = u.id
    LEFT JOIN subthemes st ON a."subThemeId" = st.id
    WHERE a."subThemeId" = $1;
    `;

    const queries: any[] = await entityManager.query(rawQuery, [data]);

    return queries;
  }
  async filterAbstractsByStatus(data: string) {
    const entityManager = getManager();

    const rawQuery = `
    SELECT
      a.id,
      a."email" as email,
      a."author" as author,
      a."title" as title,
      json_build_object(
        'first_name', u.first_name,
        'last_name', u.last_name
      ) as user,
      json_build_object(
        'name', st.name
      ) as sub_theme
    FROM abstracts a
    LEFT JOIN users u ON a."userId" = u.id
    LEFT JOIN subthemes st ON a."subThemeId" = st.id
    WHERE a."statusId" = $1;
    `;

    const queries: any[] = await entityManager.query(rawQuery, [data]);

    return queries;
  }

  remove(id: number) {
    return this.abstractRepository.delete(id);
  }
}
