import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { ReadersModule } from 'src/readers/readers.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ReadersModule,
    TypeOrmModule.forFeature([Book]),
    ClientsModule.register([
      {
        name: 'BOOK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          noAck: true,
          queue: 'BOOK_QUEUE',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ScheduleModule.forRoot(),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
