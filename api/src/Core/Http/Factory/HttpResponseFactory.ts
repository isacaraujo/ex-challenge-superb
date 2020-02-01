import { BadRequestError } from '../../Error/Http/BadRequestError';
import { ForbiddenError } from '../../Error/Http/ForbiddenError';
import { InternalServerError } from '../../Error/Http/InternalServerError';
import { NotFoundError } from '../../Error/Http/NotFoundError';
import { UnauthorizedError } from '../../Error/Http/UnauthorizedError';
import { UnhandledError } from '../../Error/Http/UnhandledError';
import { HttpErrorMapper } from '../Mapper/HttpErrorMapper';
import { HttpErrorResponse } from '../Response/HttpErrorResponse';
import { HttpJsonResponse } from '../Response/HttpJsonResponse';
import { HttpStatusCode } from '../Type/HttpStatusCode';
import { IHttpResponse } from '../Type/IHttpResponse';

class HttpResponseFactory {
  public static createErrorResponse(error: Error): IHttpResponse {
    if (error instanceof BadRequestError) {
      return this.createBadRequestErrorResponse(error as BadRequestError);
    }

    if (error instanceof UnauthorizedError) {
      return this.createUnauthorizedErrorResponse(error as UnauthorizedError);
    }

    if (error instanceof ForbiddenError) {
      return this.createForbiddenErrorResponse(error as ForbiddenError);
    }

    if (error instanceof NotFoundError) {
      return this.createNotFoundErrorResponse(error as NotFoundError);
    }

    if (error instanceof InternalServerError) {
      return this.createInternalServerErrorResponse(error as InternalServerError);
    }

    return this.createUnhandledErrorResponse(error);
  }

  public static createSuccessResponse(body: any): IHttpResponse {
    return new HttpJsonResponse(HttpStatusCode.SUCCESS, body);
  }

  public static createCreatedResponse(body: any): IHttpResponse {
    return new HttpJsonResponse(HttpStatusCode.CREATED, body);
  }

  public static createNoContentResponse(): IHttpResponse {
    return new HttpJsonResponse(HttpStatusCode.NO_CONTENT);
  }

  public static createBadRequestErrorResponse(error: BadRequestError): IHttpResponse {
    const mapper = HttpErrorMapper.create(error);

    return new HttpErrorResponse(HttpStatusCode.BAD_REQUEST, mapper);
  }

  public static createUnauthorizedErrorResponse(error: UnauthorizedError): IHttpResponse {
    const mapper = HttpErrorMapper.create(error);

    return new HttpErrorResponse(HttpStatusCode.UNAUTHORIZED, mapper);
  }

  public static createForbiddenErrorResponse(error: ForbiddenError): IHttpResponse {
    const mapper = HttpErrorMapper.create(error);

    return new HttpErrorResponse(HttpStatusCode.FORBIDDEN, mapper);
  }

  public static createNotFoundErrorResponse(error: NotFoundError): IHttpResponse {
    const mapper = HttpErrorMapper.create(error);

    return new HttpErrorResponse(HttpStatusCode.NOT_FOUND, mapper);
  }

  public static createInternalServerErrorResponse(error: InternalServerError): IHttpResponse {
    const mapper = HttpErrorMapper.create(error);

    return new HttpErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, mapper);
  }

  public static createUnhandledErrorResponse(error: Error): IHttpResponse {
    const unhandledError = new UnhandledError(error);

    return this.createInternalServerErrorResponse(unhandledError);
  }
}

export { HttpResponseFactory };
