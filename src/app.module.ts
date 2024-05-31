import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { FilelinksModule } from './filelinks/filelinks.module';
import config from './orm.config';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from './users/roles.gaurd';
import { APP_GUARD } from '@nestjs/core';
import { UserRolesModule } from './user-roles/user-roles.module';
import { RegistartioncategoriesModule } from './registartioncategories/registartioncategories.module';
import { CountriesModule } from './countries/countries.module';
import { SubthemesModule } from './subthemes/subthemes.module';
import { AbstarctsModule } from './abstarcts/abstarcts.module';
import { JisajilisModule } from './jisajilis/jisajilis.module';
import { MenusModule } from './menus/menus.module';
import { StatusesModule } from './statuses/statuses.module';
import { EmailConsumerService } from './abstarcts/email-consumer.service';
import { EmailService } from './mail.service';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    UsersModule,
    RolesModule,
    AuthModule,
    FilesModule,
    FilelinksModule,
    UserRolesModule,
    RegistartioncategoriesModule,
    CountriesModule,
    SubthemesModule,
    AbstarctsModule,
    JisajilisModule,
    MenusModule,
    StatusesModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [
    EmailService,
    EmailConsumerService,
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
