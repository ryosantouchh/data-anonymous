import type { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(`Unhandled exception (${status}): ${exception.message}`, {
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      cause: exception.cause,
    });

    const isProduction = process.env.NODE_ENV === 'production';

    if (!isProduction) {
      this.logger.error(exception);
    }

    const errorResponse = {
      statusCode: status,
      message: exception.message || 'Internal Server Error', // Provide a default message
    };

    response.status(status).json(errorResponse);
  }
}
