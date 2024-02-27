import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query as QR,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { JisajilisService } from './jisajilis.service';
import { CreateJisajiliDto } from './dto/create-jisajili.dto';
import { UpdateJisajiliDto } from './dto/update-jisajili.dto';

@Controller('jisajilis')
export class JisajilisController {
  constructor(private readonly jisajilisService: JisajilisService) {}

  @Post()
  async create(
    @Body() createJisajiliDto: CreateJisajiliDto,
  ): Promise<{ message: string }> {
    const data: any = createJisajiliDto;
    await this.jisajilisService.create(data);
    return {
      message:
        'Saved successfully. Please re-login to see the changes on your account.',
    };
  }

  @Get()
  findAll() {
    return this.jisajilisService.findAll();
  }

  @Get('jisajilis/search')
  searchJisajili(@QR('regSearchTerm') regSearchTerm: string) {
    // return `Search=${regSearchTerm}`;
    return this.jisajilisService
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateJisajiliDto: UpdateJisajiliDto,
  ) {
    return this.jisajilisService.update(+id, updateJisajiliDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jisajilisService.remove(+id);
  }
}
