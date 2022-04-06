import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadersModule } from './readers/readers.module';
import { ContactsModule } from './contacts/contacts.module';
import { RolesModule } from './roles/roles.module';
import { MeetingsModule } from './meetings/meetings.module';
import { Book } from './books/entities/book.entity';
import { Reader } from './readers/entities/reader.entity';
import { Contact } from './contacts/entities/contact.entity';
import { Meeting } from './meetings/entities/meeting.entity';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import config from './orm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Contact, Reader, Book, Meeting]),
    UsersModule,
    BooksModule,
    ReadersModule,
    ContactsModule,
    RolesModule,
    MeetingsModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
