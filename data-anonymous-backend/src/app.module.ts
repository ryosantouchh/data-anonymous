import { Module } from '@nestjs/common';
import { AppConfigModule } from './common/config/config.module';
import { HealthModule } from './common/health/health.module';
import { PinoLoggerModule } from './common/logger/logger.module';
import { ExceptionModule } from './common/exception/exception.module';
import { DatabaseModule } from './common/database/database.module';

@Module({
  imports: [
    AppConfigModule,
    HealthModule,
    PinoLoggerModule,
    ExceptionModule,
    DatabaseModule,
  ],
})
export class AppModule {}
