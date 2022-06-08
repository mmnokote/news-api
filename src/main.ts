import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';
import { static as expose } from 'express';

////validation pipes
// import { ValidationPipe } from './pipes/validation.pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  //using filters and pipes
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  ///using API version
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api/v1');

  //swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Learning Node Js in Nest Framework')
    .setDescription('Swagger API Documenat')
    .setVersion('v1')
    .addTag('List of APIs', 'Restful APIs')
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  app.use(expose('public'));
  await app.listen(3300);
}
bootstrap();
