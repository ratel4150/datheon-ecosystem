// File: services/api/src/main.ts
import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // TODO: restringir a los dominios reales antes de producción
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();