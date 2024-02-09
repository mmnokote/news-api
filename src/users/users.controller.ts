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

  @Get()
  @UseGuards(JwtAuthGuard)
  // @Roles(Role.ADMIN)
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
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService
  //     .create(createUserDto)
  //     .then((response) => {
  //       if (response) {
  //         return response;
  //       } else {
  //         throw new NotFoundException('User not created');
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //       if (error.driverError.code === 'ER_DUP_ENTRY') {
  //         throw new ConflictException({
  //           statusCode: 409,
  //           message: 'Conflict',
  //           error: 'Duplicate record',
  //           detail: error.driverError.sqlMessage,
  //         });
  //       }
  //       throw new InternalServerErrorException({
  //         statusCode: 500,
  //         message: 'Internal Server Error',
  //         // error: 'Something went wrong',
  //         error: error.driverError.code,
  //       });
  //     });
  // }
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
          message: 'User not found',
        });
      }

      // Assuming `user` has a password property, replace it with your actual password field
      const password = user.password;

      const body = {
        email: email,
        password: password,
      };
      // Send email with the password
      await this.emailService.sendMail(body);

      return { message: 'Email sent successfully' };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      }
      // throw new InternalServerErrorException(error.detail);
      throw new NotFoundException({
        message: 'User with the provided information not found',
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
  // @Roles(Role.USER)
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
