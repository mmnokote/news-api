import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query as QR,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from '../mail.service';
import { TwilioService } from 'twilio.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly twilioService: TwilioService,
  ) {}

  @Post('sendMail')
  async sendEmail(@Body() body) {
    // const { to, subject, text } = body;
    await this.emailService.sendMail(body);
    return { message: 'Email sent successfully' };
  }

  @Post('sendSubmissionMail')
  async sendsubmissionEmail(@Body() body) {
    console.log('bbbbbody', body);
    await this.emailService.sendSubmissionMail(body);
    return { message: 'Email sent successfully' };
  }

  @Post('sendSms')
  async sendSms(@Body() data: { to: string; message: string }) {
    try {
      await this.twilioService.sendSms(data.to, data.message);
      return { success: true, message: 'SMS sent successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to send SMS' };
    }
  }

  // @Get()
  // findAll() {
  //   return this.usersService
  //     .findAll()
  //     .then((response) => {
  //       return response;
  //     })
  //     .catch((error) => {
  //       throw new NotFoundException(error.detail);
  //     });
  // }
  @Get('users/oneUser')
  searchUserByIdentification(@QR('regSearchTerm') regSearchTerm: string) {
    // return `Search=${regSearchTerm}`;
    return this.usersService
      .seachOneByID(`${regSearchTerm}`)
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

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService
      .create(createUserDto)
      .then((response) => {
        if (response) {
          return response;
        } else {
          throw new NotFoundException();
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error.code === '23505') {
          throw new ConflictException(error.detail);
        }
        throw new InternalServerErrorException();
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService
      .findOne(+id)
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
  @Get(':username')
  findOneUser(@Param('username') username: string) {
    return this.usersService
      .findOne(+username)
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

  @Get()
  searchUser(@QR('regSearchTerm') regSearchTerm: string) {
    // return `Search=${regSearchTerm}`;
    return this.usersService
      .searchOne(`${regSearchTerm}`)
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

  // @Get('getQueryDocumentTypesByCategory/:id')
  // findAllByid(@Param('id') id: string) {
  //   return this.queryDocumentTypesService.findAllById(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
