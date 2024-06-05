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
      data: {
        newsImage: abstract.urlToImage || '', // Assuming `abstract.imageUrl` contains the URL of the image
        newsTitle: abstract.title || 'No Title',
        newsDate: abstract.createdAt
          ? abstract.createdAt.toISOString().split('T')[0]
          : 'No Date', // Assuming `abstract.publicationDate` is a Date object
        author: abstract.author || 'Unknown',
        description: abstract.description || 'No Description',
        content: abstract.content || 'No Content',
        source: 'MnNews',
        url: abstract.url || '', // Assuming `abstract.url` contains the URL of the full article
      },
    };

    for (const notification of notifications) {
      const result = await this.firebaseAdminService.sendNotification(
        notification.fcmToken,
        notificationData.title,
        notificationData.body,
        notificationData.data,
      );
      console.log('Notification Result:', result.message);
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
    const queryBuilder = this.abstractRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.subTheme', 'sub_theme') // Ensure subTheme is eagerly loaded
      .orderBy('c.id', 'DESC');

    return paginate<Abstarct>(queryBuilder, options);
  }

  async getAbstractData(): Promise<any> {
    const abstracts = await this.abstractRepository.find({
      where: { published: true },
    });

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

  async findAllMyAbs(req: any, query: string) {
    let queryBuilder = this.abstractRepository
      .createQueryBuilder('abstracts')
      .leftJoinAndSelect('abstracts.user', 'user')
      .leftJoinAndSelect('abstracts.subTheme', 'sub_theme')
      .where('abstracts.published = :published', { published: true })
      .orderBy('abstracts.id', 'DESC');

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
        // console.log('updatedAbstract title', updatedAbstract.title);
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
          return { message: 'News updated  successful' };
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

  async filterAbstracts(
    regSearchTerm: string,
    options: IPaginationOptions,
  ): Promise<Pagination<Abstarct>> {
    const entityManager = getManager();

    const queryBuilder = entityManager
      .createQueryBuilder(Abstarct, 'a')
      .leftJoinAndSelect('a.subTheme', 'st')
      .where('a.subThemeId = :subThemeId', { subThemeId: regSearchTerm });

    return paginate<Abstarct>(queryBuilder, options);
  }
  // async filterAbstracts(data: string) {
  //   const entityManager = getManager();

  //   const rawQuery = `
  //   SELECT
  //     a.id,
  //     a."author" as author,
  //     a."title" as title,
  //     a."url" as url,
  //     a."description" as description,
  //     json_build_object(
  //       'name', st.name
  //     ) as sub_theme
  //   FROM abstracts a
  //   LEFT JOIN subthemes st ON a."subThemeId" = st.id
  //   WHERE a."subThemeId" = $1;
  //   `;

  //   const queries: any[] = await entityManager.query(rawQuery, [data]);

  //   return queries;
  // }
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

  async togglePublish(id: number): Promise<{ message: string }> {
    const abstract = await this.abstractRepository.findOne(id);
    if (!abstract) {
      throw new NotFoundException(`Abstract with ID ${id} not found`);
    }

    abstract.published = !abstract.published;
    await this.abstractRepository.save(abstract);

    const message = abstract.published
      ? 'News published successfully'
      : 'News unpublished successfully';
    return { message };
  }
}
