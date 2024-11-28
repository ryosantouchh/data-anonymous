import { ValidationError } from '@nestjs/common';
import { ValidatorOptions } from 'class-validator';

export interface ValidationPipeOptions extends ValidatorOptions {
  transform?: boolean;
  disableErrorMessages?: boolean;
  exceptionFactory?: (errors: ValidationError[]) => any;
}

export const validatorConfig: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
};
