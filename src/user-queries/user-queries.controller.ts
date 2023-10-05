import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserQueriesService } from './user-queries.service';
import { UpdateUserQueryDto } from './dto/update-user-query.dto';
import { CreateUserQueryDto } from './dto/create-user-query.dto';

@Controller('user-queries')
export class UserQueriesController {
  constructor(private readonly userQueriesService: UserQueriesService) {}

  @Post()
  create(@Body() createUserQueryDto: CreateUserQueryDto) {
    const userId = createUserQueryDto.user_id;
    const queriesId = createUserQueryDto.queryId;
    // console.log('mmmmmm', queriesId);
    return this.userQueriesService.assignQueryToUser(userId, queriesId);
  }

  @Get()
  findAll() {
    return this.userQueriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userQueriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserQueryDto: UpdateUserQueryDto,
  ) {
    return this.userQueriesService.update(+id, updateUserQueryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userQueriesService.remove(+id);
  }
}
