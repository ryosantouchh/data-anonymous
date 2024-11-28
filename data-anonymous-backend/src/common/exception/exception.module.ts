import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';

import { HttpExceptionFilter } from './http-exception.filter';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        autoLogging: false,
        customProps: () => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
  ],
  providers: [{ provide: APP_FILTER, useClass: HttpExceptionFilter }],
})
export class ExceptionModule {}
