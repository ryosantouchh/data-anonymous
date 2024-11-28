import { HttpStatus } from '@nestjs/common';

export type HttpResponseType<TResponseData> = {
  statusCode: HttpStatus;
  message: string | string[];
  data?: TResponseData;
};

export class BaseHttpResponse {
  readonly message: string | string[];
  readonly statusCode: HttpStatus;

  constructor({ statusCode, message }: HttpResponseType<any>) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export class HttpResponse<TResponseData> extends BaseHttpResponse {
  readonly data: TResponseData;

  constructor({ statusCode, message, data }: HttpResponseType<TResponseData>) {
    super({ statusCode, message });
    this.data = data;
  }
}
