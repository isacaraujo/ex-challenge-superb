import { HttpResponseFactory } from '../Http/Factory/HttpResponseFactory';
import { IHttpRequest } from '../Http/Type/IHttpRequest';
import { IHttpResponse } from '../Http/Type/IHttpResponse';
import { IActionController } from './IActionController';

abstract class ActionController implements IActionController {
  protected createSuccessResponse(body: any): IHttpResponse {
    return HttpResponseFactory.createSuccessResponse(body);
  }

  protected createCreatedResponse(body: any): IHttpResponse {
    return HttpResponseFactory.createCreatedResponse(body);
  }

  protected createNoContentResponse(): IHttpResponse {
    return HttpResponseFactory.createNoContentResponse();
  }

  protected createErrorResponse(error: Error): IHttpResponse {
    return HttpResponseFactory.createErrorResponse(error);
  }

  public abstract perform(request: IHttpRequest): Promise<IHttpResponse>;
}

export { ActionController };
