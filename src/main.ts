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
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

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
    .setTitle('CONFERENCE PORTAL API DOCUMENTATION')
    .setDescription(
      '......................._______________.........................................._______________.........................................._______________...................',
    )
    .setVersion('v1')
    .addTag('List of APIs', 'Restful APIs')
    .addBearerAuth() // Add this line to enable Bearer token authentication
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('list-of-api', app, document);
  // Customize CORS options
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:4000', // Specify your allowed origin(s)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (e.g., cookies)
    optionsSuccessStatus: 204, // Set the HTTP status for successful CORS preflight requests
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization', // Specify allowed headers
  };

  // Enable CORS with custom options
  app.enableCors(corsOptions);
  await app.listen(3200);
}
bootstrap();
