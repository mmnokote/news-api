import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  Query as QR,
  UseGuards,
} from '@nestjs/common';
import { QueriesService } from './queries.service';
import { CreateQueryDto } from './dto/create-query.dto';
import { UpdateQueryDto } from './dto/update-query.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('queries')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @Post()
  create(@Body() createQueryDto: CreateQueryDto) {
    const data: any = createQueryDto;
    // console.log('xxxxxxxx', createQueryDto);

    return this.queriesService.create(data);
  }
  @Patch(':id')
  sendFeedback(
    @Param('id') id: string,
    @Body() updateQueryDto: UpdateQueryDto,
  ) {
    const data: any = updateQueryDto;
    console.log('xxxxxxxxFeedback', updateQueryDto);

    return this.queriesService.createFeedback(+id, data);
  }

  @Get('oneQuery')
  searchUser(@QR('regSearchTerm') regSearchTerm: string) {
    // return `Search=${regSearchTerm}`;
    return this.queriesService
      .seachOne(`${regSearchTerm}`)
      .then((response) => {
        if (response) {
          return response;
        } else {
          throw new InternalServerErrorException();
        }
      })
      .catch((error) => {
        throw new NotFoundException(error.detail);
      });
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.queriesService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Get('querybyCategory')
  findAllByCategory() {
    return this.queriesService.findAllByCategory();
  }

  @UseGuards(JwtAuthGuard)
  @Get('querybyNature')
  findAllByNature() {
    return this.queriesService.findAllByNature();
  }

  @UseGuards(JwtAuthGuard)
  @Get('queryTopFive')
  findAllTopFive() {
    return this.queriesService.findAllTopFive();
  }

  @UseGuards(JwtAuthGuard)
  @Get('queryByGender')
  queryByGender() {
    return this.queriesService.queryByGender();
  }

  @UseGuards(JwtAuthGuard)
  @Get('querySummary')
  querySummary() {
    return this.queriesService.querySummary();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queriesService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateQueryDto: UpdateQueryDto) {
  //   return this.queriesService.update(+id, updateQueryDto);
  // }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.queriesService.remove(+id);
  }
}
