import { Serialize } from '../../Cerialize/Serialize';
import { HttpErrorMapper } from '../Mapper/HttpErrorMapper';
import { IHttpHeaders } from '../Type/IHttpHeaders';
import { IHttpResponse } from '../Type/IHttpResponse';

class HttpErrorResponse extends Serialize implements IHttpResponse {
  public constructor(
    private readonly statusCode: number,
    private readonly error: HttpErrorMapper,
    private readonly headers: IHttpHeaders = {}
  ) {
    super();
  }

  public get StatusCode(): number {
    return this.statusCode;
  }

  public get Body(): any {
    return this.serialize(this.error);
  }

  public get Headers(): IHttpHeaders {
    return this.headers;
  }
}

export { HttpErrorResponse };
