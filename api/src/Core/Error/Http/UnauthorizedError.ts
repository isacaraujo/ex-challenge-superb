import { HttpError } from './HttpError';
import { HttpStatusCode } from '../../Http/Type/HttpStatusCode';

abstract class UnauthorizedError extends HttpError {
  public static readonly ERROR_TYPE = 'Unauthorized';

  public constructor(message: string, errorType: string) {
    super(message, HttpStatusCode.FORBIDDEN, UnauthorizedError.ERROR_TYPE, errorType);
  }
}

export { UnauthorizedError };
