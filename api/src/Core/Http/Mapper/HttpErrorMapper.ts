import { serialize } from 'cerialize';

import { HttpError } from '../../Error/Http/HttpError';

class HttpErrorMapper {
  public constructor(private readonly error: HttpError) {}

  @serialize
  public get Message(): string {
    return this.error.message;
  }

  @serialize
  public get StatusCode(): number {
    return this.error.statusCode;
  }

  @serialize
  public get ErrorType(): string {
    return this.error.errorType;
  }

  @serialize
  public get OriginalErrorType(): string {
    return this.error.originalErrorType;
  }

  public static create(error: HttpError): HttpErrorMapper {
   return new HttpErrorMapper(error);
  }
}

export { HttpErrorMapper };
