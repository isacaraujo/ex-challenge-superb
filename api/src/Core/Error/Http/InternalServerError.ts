import { HttpError } from './HttpError';
import { HttpStatusCode } from '../../Http/Type/HttpStatusCode';

abstract class InternalServerError extends HttpError {
  public static readonly ERROR_TYPE = 'InternalServerError';

  public constructor(message: string, errorType: string) {
    super(message, HttpStatusCode.INTERNAL_SERVER_ERROR, InternalServerError.ERROR_TYPE, errorType);
  }
}

export { InternalServerError };
