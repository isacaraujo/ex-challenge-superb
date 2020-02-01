import { Serialize } from '../../Cerialize/Serialize';
import { IHttpHeaders } from '../Type/IHttpHeaders';
import { IHttpResponse } from '../Type/IHttpResponse';

class HttpJsonResponse extends Serialize implements IHttpResponse {
  public constructor(
    private readonly statusCode: number,
    private readonly body?: any,
    private readonly headers: IHttpHeaders = {}
  ) {
    super();
  }

  public get StatusCode(): number {
    return this.statusCode;
  }

  public get Body(): string {
    return this.serialize(this.body);
  }

  public get Headers(): IHttpHeaders {
    return this.headers;
  }
}

export { HttpJsonResponse };

