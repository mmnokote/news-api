import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReadersModule } from './readers/readers.module';
import { RolesModule } from './roles/roles.module';
import { MeetingsModule } from './meetings/meetings.module';
import { Book } from './books/entities/book.entity';
import { Reader } from './readers/entities/reader.entity';
import { Meeting } from './meetings/entities/meeting.entity';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { LevelsModule } from './levels/levels.module';
import { QueriesModule } from './queries/queries.module';
import { QueryCategoriesModule } from './query-categories/query-categories.module';
import { UserQueriesModule } from './user-queries/user-queries.module';
import { QueryStatusesModule } from './query-statuses/query-statuses.module';
import { QueryFeedbackAttachmentsModule } from './query-feedback-attachments/query-feedback-attachments.module';
import { QueryClaimAttachmentsModule } from './query-claim-attachments/query-claim-attachments.module';
import { QueryDocumentTypesModule } from './query-document-types/query-document-types.module';
import { MenusModule } from './menus/menus.module';
import { UserMenusModule } from './user-menus/user-menus.module';
import { FilesModule } from './files/files.module';
import { FilelinksModule } from './filelinks/filelinks.module';
import config from './orm.config';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from './users/roles.gaurd';
import { APP_GUARD } from '@nestjs/core';
import { UserRolesModule } from './user-roles/user-roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([Reader, Book, Meeting]),
    UsersModule,
    BooksModule,
    ReadersModule,
    RolesModule,
    MeetingsModule,
    AuthModule,
    CategoriesModule,
    LevelsModule,
    QueriesModule,
    QueryCategoriesModule,
    UserQueriesModule,
    QueryStatusesModule,
    QueryFeedbackAttachmentsModule,
    QueryClaimAttachmentsModule,
    QueryDocumentTypesModule,
    MenusModule,
    UserMenusModule,
    FilesModule,
    FilelinksModule,
    UserRolesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
