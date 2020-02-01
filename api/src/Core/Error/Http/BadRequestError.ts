import { HttpError } from './HttpError';
import { HttpStatusCode } from '../../Http/Type/HttpStatusCode';

abstract class BadRequestError extends HttpError {
  public static readonly ERROR_TYPE = 'BadRequest';

  public constructor(message: string, errorType: string) {
    super(message, HttpStatusCode.BAD_REQUEST, BadRequestError.ERROR_TYPE, errorType);
  }
}

export { BadRequestError };
