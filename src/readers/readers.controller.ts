import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ReadersService } from './readers.service';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

// @UseGuards(JwtAuthGuard)
@Controller('readers')
export class ReadersController {
  constructor(private readonly readersService: ReadersService) {}

  @Post()
  create(@Body() createReaderDto: CreateReaderDto) {
    return this.readersService
      .create(createReaderDto)
      .then((response) => {
        if (response) {
          return response;
        } else {
          throw new InternalServerErrorException();
        }
      })
      .catch((error) => {
        console.log(error);

        throw new InternalServerErrorException();
      });
  }

  @Get()
  findAll() {
    return this.readersService
      .findAll()
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
          throw new ConflictException(error.detail);
        }

        throw new InternalServerErrorException();
      });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.readersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReaderDto: UpdateReaderDto) {
    return this.readersService.update(+id, updateReaderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.readersService.remove(+id);
  }
}
