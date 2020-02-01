import { HttpError } from './HttpError';
import { HttpStatusCode } from '../../Http/Type/HttpStatusCode';

abstract class NotFoundError extends HttpError {
  public static readonly ERROR_TYPE = 'NotFound';

  public constructor(message: string, errorType: string) {
    super(message, HttpStatusCode.NOT_FOUND, NotFoundError.ERROR_TYPE, errorType);
  }
}

export { NotFoundError };
