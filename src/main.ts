import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './config/app.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { corsOptions } from './config/cors.option';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  app.useLogger(new Logger());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('MKS-TEST')
    .setDescription('MKS-TEST API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT-auth',
    )
    .addTag('User')
    .addTag('Auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  appConfig(app);
  await app.listen(3000);
}
bootstrap();
