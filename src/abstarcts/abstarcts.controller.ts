import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseGuards,
  UsePipes,
  Req,
  InternalServerErrorException,
  NotFoundException,
  Query as QR,
} from '@nestjs/common';

import { CreateAbstarctDto } from './dto/create-abstarct.dto';
import { UpdateAbstarctDto } from './dto/update-abstarct.dto';

import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Role } from 'src/users/entities/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { AbstarctsService } from './abstarcts.service';
import { Abstarct } from './entities/abstarct.entity';
// @UseGuards(JwtAuthGuard)
// @Roles(Role.ADMIN)
@Controller('abstarcts')
export class AbstarctsController {
  constructor(private readonly abstarctsService: AbstarctsService) {}

  @Post('abstract-notifications/:abstractId')
  async sendNotificationsForAbstract(
    @Param('abstractId') abstractId: string,
    @Body() notificationData: { title: string; body: string },
  ) {
    const result = await this.abstarctsService.sendNotificationsForAbstract(
      abstractId,
    );
    return {
      data: result,
      message: 'Notification sent successfully',
    };
  }

  @Post()
  async create(
    @Body() createDataDto: CreateAbstarctDto,
  ): Promise<{ data: Abstarct; message: string }> {
    try {
      const result = await this.abstarctsService.create(createDataDto);
      return {
        data: result,
        message: 'News created successfully',
      };
    } catch (error) {
      // Handle errors here
      return {
        data: null,
        message: error.message || 'Failed to create news',
      };
    }
  }

  @Get('myabstarcts')
  async myAbstarcts(
    @Query('q') query: string,
    @Query('fcmToken') fcmToken: string,
    @Req() req,
  ) {
    return this.abstarctsService.findAllMyAbs(req, query, fcmToken);
  }
  @Get('myabstarcts/myLikes')
  async myLikedAbs(
    @Query('q') query: string,
    @Query('fcmToken') fcmToken: string,
    @Req() req,
  ) {
    return this.abstarctsService.findLikedAbs(req, query, fcmToken);
  }

  @Get('')
  async index(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit = 5,
  ): Promise<Pagination<Abstarct>> {
    limit = limit > 100 ? 100 : limit;
    return this.abstarctsService.paginate({
      page,
      limit,
    });
  }

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Get('getabstractdata')
  getAbstractData() {
    return this.abstarctsService.getAbstractData();
  }

  @Get('filter')
  async filterAbstracts(
    @Query('regSearchTerm') regSearchTerm: string,
    @Query() options: IPaginationOptions,
  ): Promise<Pagination<Abstarct>> {
    return this.abstarctsService.filterAbstracts(regSearchTerm, options);
  }

  @Roles(Role.ADMIN)
  @Get('filter/ByStatus')
  ByStatus(@QR('regSearchTerm') regSearchTerm: string) {
    // return `Search=${regSearchTerm}`;
    return this.abstarctsService
      .filterAbstractsByStatus(`${regSearchTerm}`)
      .then((response) => {
        if (response) {
          return response;
        } else {
          throw new InternalServerErrorException();
        }
      })
      .catch((error) => {
        throw new NotFoundException(error);
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.abstarctsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateData: UpdateAbstarctDto) {
    return this.abstarctsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.abstarctsService.remove(+id);
  }

  @Patch('publish/:id')
  async togglePublish(@Param('id') id: string) {
    return this.abstarctsService.togglePublish(+id);
  }
}
