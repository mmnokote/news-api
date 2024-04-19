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
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from '../mail.service';
import { TwilioService } from 'twilio.service';
import { Role } from './entities/role.enum';
import { Roles } from './roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import * as amqp from 'amqplib'; // Import amqplib

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly twilioService: TwilioService,
  ) {}

  @Roles(Role.EMAIL)
  @Post('sendMail')
  async sendEmail(@Body() body) {
    // const { to, subject, text } = body;
    await this.emailService.sendMail(body);
    return { message: 'Email sent successfully' };
  }

  @Roles(Role.EMAIL)
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

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService
      .findAll()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw new NotFoundException(error.detail);
      });
  }

  @Get('users/oneUser')
  searchUserByIdentification(@QR('regSearch') regSearch: string) {
    // return `Search=${regSearchTerm}`;
    return this.usersService
      .seachOneByID(`${regSearch}`)
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
        console.log(error);
        if (error.code === '23505') {
          // throw new ConflictException(error.detail);
        }
        // throw new InternalServerErrorException();
      });
  }
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Post('verifyQR')
  verifyQR(@Body() dataDto: any) {
    return this.usersService
      .verifyQR(dataDto)
      .then((response) => {
        if (response) {
          return response;
        } else {
          throw new NotFoundException();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === '23505') {
          // throw new ConflictException(error.detail);
        }
        // throw new InternalServerErrorException();
      });
  }

  @Post('restore-password')
  async restorePassword(
    @Body()
    { usernameRestore, email }: { usernameRestore: string; email: string },
  ) {
    // console.log('email', usernameRestore);
    try {
      // Find the user by username
      const user = await this.usersService.findByUsername(usernameRestore);

      if (!user) {
        throw new NotFoundException({
          message: 'User with the provided information not found',
        });
      }

      if (user) {
        // Assuming `user` has a password property, replace it with your actual password field
        const password = user.password;

        const body = {
          email: email,
          password: password,
        };
        // Send email with the password
        // const connection = await amqp.connect('amqp://localhost');
        const connection = await amqp.connect(
          'amqp://rabbitmq:Passw0rd123@172.16.18.166:5672',
        );
        const channel = await connection.createChannel();
        const queue = 'email_queue';
        await channel.assertQueue(queue, { durable: true });

        const message = JSON.stringify({
          email: user.email,
          comment: user.password,
          code: 'RESTORE',
        });
        channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

        return {
          message: 'Your password has been restored and sent to your email.',
        };
        // await this.emailService.sendMail(body);

        // return {
        //   message: 'Your password has been restored and sent to your email.',
        // };
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      }
      // throw new InternalServerErrorException(error.detail);
      throw new NotFoundException({
        message: error.details,
      });
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.ATENDEE)
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
  @Get('users/search')
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
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

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  @Roles(Role.ADMIN)
  @Patch(':id/change-status')
  activation(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.activateUser(+id, updateUserDto);
  }
}
