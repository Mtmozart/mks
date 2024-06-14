import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { appConfig } from './config/app.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('MKS-TEST')
    .setDescription('MKS-TEST API description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' })
    .addTag('User')
    .addTag('Auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  appConfig(app);
  await app.listen(3000);
}
bootstrap();
