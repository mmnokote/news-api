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
import { LevelsModule } from './levels/levels.module';
import { ActivitiesModule } from './activities/activities.module';
import { FileuploadsModule } from './fileuploads/fileuploads.module';
import { PermissionsModule } from './permissions/permissions.module';
import config from './orm.config';
import { RolesGuard } from './roles/permissions.guard';
import { APP_GUARD } from '@nestjs/core';

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
    LevelsModule,
    ActivitiesModule,
    FileuploadsModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
