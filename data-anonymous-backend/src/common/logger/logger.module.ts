import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'warn',
        transport: {
          target: 'pino-pretty',
          options: {
            ignore: 'pid,hostname,res,req',
            singleLine: true,
          },
        },
      },
    }),
  ],
  exports: [LoggerModule],
})
export class PinoLoggerModule {}
