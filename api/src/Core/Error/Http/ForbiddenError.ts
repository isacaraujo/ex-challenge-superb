import { HttpError } from './HttpError';
import { HttpStatusCode } from '../../Http/Type/HttpStatusCode';

abstract class ForbiddenError extends HttpError {
  public static readonly ERROR_TYPE = 'Forbidden';

  public constructor(message: string, errorType: string) {
    super(message, HttpStatusCode.FORBIDDEN, ForbiddenError.ERROR_TYPE, errorType);
  }
}

export { ForbiddenError };
