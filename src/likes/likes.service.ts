// src/likes/likes.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLikeDto } from './dto/create-like.dto';
import { Like } from './entities/like.entity';
import { Abstarct } from 'src/abstarcts/entities/abstarct.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    @InjectRepository(Abstarct)
    private readonly abstractRepository: Repository<Abstarct>,
  ) {}

  async likePost(postId: number, createLikeDto: CreateLikeDto): Promise<Like> {
    const abstract = await this.abstractRepository.findOne({
      where: { id: postId },
    });
    if (!abstract) {
      throw new Error('Post not found');
    }

    const like = this.likeRepository.create({
      fcmToken: createLikeDto.fcmToken,
      abstract,
    });

    return this.likeRepository.save(like);
  }

  // async likePost(
  //   postId: number,
  //   createLikeDto: CreateLikeDto,
  // ): Promise<Like | void> {
  //   const abstract = await this.abstractRepository.findOne({
  //     where: { id: postId },
  //   });
  //   if (!abstract) {
  //     throw new Error('Post not found');
  //   }

  //   const existingLike = await this.likeRepository.findOne({
  //     where: { fcmToken: createLikeDto.fcmToken, abstractId: postId },
  //   });

  //   if (existingLike) {
  //     await this.likeRepository.delete(existingLike.id);
  //     return; // Return void if it was a dislike
  //   }

  //   const like = this.likeRepository.create({
  //     fcmToken: createLikeDto.fcmToken,
  //     abstract,
  //   });

  //   return this.likeRepository.save(like); // Return the saved like
  // }

  async getLikesCount(postId: number): Promise<{ like_count: number }> {
    const count = await this.likeRepository.count({
      where: { abstract: { id: postId } },
    });
    return { like_count: count };
  }

  // async getLikesCount(abstractId: number): Promise<{ like_count: number }> {
  //   const count = await this.likeRepository.count({ where: { abstractId } });
  //   return { like_count: count };
  // }
}
