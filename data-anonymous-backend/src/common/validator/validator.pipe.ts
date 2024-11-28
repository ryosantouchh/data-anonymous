import { PipeTransform, ArgumentMetadata, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';

export class CustomValidationPipe implements PipeTransform<unknown> {
  async transform(value: object, _metaData: ArgumentMetadata) {
    const object = new Object();
    Object.assign(object, value);

    const errors = await validate(value);
    console.log(errors);

    if (errors.length > 0) {
      const errorMessage = 'Validation failed: ' + JSON.stringify(errors);
      const response = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: errorMessage,
      };
      return response;
    }

    return value;
  }
}
