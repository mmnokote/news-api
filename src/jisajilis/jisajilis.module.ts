import { Module } from '@nestjs/common';
import { JisajilisService } from './jisajilis.service';
import { JisajilisController } from './jisajilis.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jisajili } from './entities/jisajili.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Jisajili, User])],
  controllers: [JisajilisController],
  providers: [JisajilisService],
})
export class JisajilisModule {}
