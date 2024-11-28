import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/exception/http-exception.filter';
import { Logger as PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    exposedHeaders: ['Authorization'],
    credentials: true, // Enable credentials (cookies, authorization headers) cross-origin
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  app.useLogger(app.get(PinoLogger));

  await app.listen(port);
}
bootstrap();
