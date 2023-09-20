import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

////validation pipes
// import { ValidationPipe } from './pipes/validation.pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //using filters and pipes
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  ///using API version
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api/v1');

  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('GRM Node Js in Nest Framework')
    .setDescription('Swagger API Documenat')
    .setVersion('v1')
    .addTag('List of APIs', 'Restful APIs')
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('list-of-api', app, document);

  //session ***express uses in memory ,bt it not working in production(use redis eg)
  app.use(
    session({
      secret: 'secret', ///put in enviroment variable
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();

  await app.listen(3200);
}
bootstrap();
