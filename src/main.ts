import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';

import {
  DocumentBuilder,
  SwaggerModule,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api/v1'); //edit your prefix as per your requirements!

  const config = new DocumentBuilder()
    .setTitle('Mnokote Learning Node in Nest Js')
    .setDescription('Demo API Application')
    .setVersion('v1')
    .addTag('')
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3200);
}
bootstrap();
