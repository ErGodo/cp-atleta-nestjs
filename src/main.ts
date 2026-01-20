import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'https://canteraplay-dash-605024846890.us-central1.run.app'],
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3003, '0.0.0.0');
}
bootstrap();
