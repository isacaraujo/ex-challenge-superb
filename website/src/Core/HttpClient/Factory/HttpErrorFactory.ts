import { HttpError } from '../Error/HttpError';
import { NotFoundError } from '../Error/NotFoundError';
import { HttpStatus } from '../Type/HttpStatus';
import { BadRequestError } from '../Error/BadRequestError';
import { UnauthorizedError } from '../Error/UnauthorizedError';
import { ForbiddenError } from '../Error/ForbiddenError';
import { InternalServerError } from '../Error/InternalServerError';
import { HttpUnhandledError } from '../Error/HttpUnhandledError';
import { HttpClientError } from '../Error/HttpClientError';

class HttpErrorFactory {
  public static create(error: any): HttpError {
    if (error.response) {
      return HttpErrorFactory.createResponseError(error);
    } else if (error.request) {
      return new HttpClientError(error.message, error);
    }

    return new HttpUnhandledError(error.message, error);
  }

  private static createResponseError(error: any): HttpError {
    const response = error.response;
    // const data = response.data;
    // const headers = response.headers;

    switch (response.status) {
      case HttpStatus.BAD_REQUEST:
        return new BadRequestError(error.message, error);
      case HttpStatus.UNAUTHORIZED:
        return new UnauthorizedError(error.message, error);
      case HttpStatus.FORBIDDEN:
        return new ForbiddenError(error.message, error);
      case HttpStatus.NOT_FOUND:
        return new NotFoundError(error.message, error);
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return new InternalServerError(error.message, error);
      default:
        return new InternalServerError(error.message, error);
    }
  }
}

export { HttpErrorFactory };
