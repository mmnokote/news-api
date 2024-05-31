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
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Role } from 'src/users/entities/role.enum';
import { Roles } from 'src/users/roles.decorator';
import { NotificationService } from './notification.service';
// @UseGuards(JwtAuthGuard)
// @Roles(Role.ADMIN)
@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
  @Post()
  create(@Body() createDataDto: CreateNotificationDto) {
    return this.notificationService.create(createDataDto);
  }

  @Get()
  findAll() {
    return this.notificationService.findAll();
  }
  // @Get('')
  // async index(
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  // ): Promise<Pagination<Country>> {
  //   limit = limit > 100 ? 100 : limit;
  //   return this.notificationService.paginate({
  //     page,
  //     limit,
  //   });
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDataDto: UpdateNotificationDto,
  ) {
    return this.notificationService.update(+id, updateDataDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.notificationService.remove(+id);
  // }
  @Delete(':fcmToken')
  remove(@Param('fcmToken') fcmToken: string) {
    return this.notificationService.removeByFcmToken(fcmToken);
  }
}
