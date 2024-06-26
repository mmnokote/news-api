import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const result = await this.notificationRepository.save(
        createNotificationDto,
      );

      if (result) {
        return {
          statusCode: 200,
          message: 'Notification created successfully',
        };
      }

      return {
        statusCode: 400,
        message: 'Failed to create notification',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
      };
    }
  }

  async paginate(
    options: IPaginationOptions,
  ): Promise<Pagination<Notification>> {
    const queryBuilder = this.notificationRepository.createQueryBuilder('c');
    queryBuilder.orderBy('c.name', 'DESC'); // Or whatever you need to do

    return paginate<Notification>(queryBuilder, options);
  }

  findAll() {
    const countries = this.notificationRepository
      .createQueryBuilder()
      .getMany();
    return countries;

    // const id = 3;
    // return this.notificationRepository
    //   .createQueryBuilder('countries')
    //   .leftJoinAndSelect('countries.reader', 'reader')
    //   .where('reader.id = :readerId', { readerId: id })
    //   .getMany();
  }

  findOne(id: number) {
    return this.notificationRepository.findOne(id);
  }

  update(id: number, updateQueryPriorityDto: UpdateNotificationDto) {
    return this.notificationRepository.update(id, updateQueryPriorityDto);
  }

  // remove(id: number) {
  //   return this.notificationRepository.delete(id);
  // }

  async removeByFcmToken(
    fcmToken: string,
  ): Promise<{ statusCode: number; message: string }> {
    try {
      const result = await this.notificationRepository.delete({
        fcmToken: fcmToken,
      });

      if (result.affected === 0) {
        return {
          statusCode: 404,
          message: 'FCM token not found',
        };
      }

      return {
        statusCode: 200,
        message: 'Notification preference updated successfully',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Internal server error',
      };
    }
  }
}
