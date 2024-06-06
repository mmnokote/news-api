// src/likes/likes.controller.ts
import { Controller, Post, Body, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId')
  async likePost(
    @Param('postId') postId: string,
    @Body() createLikeDto: CreateLikeDto,
  ) {
    return this.likesService.likePost(+postId, createLikeDto);
  }
}
