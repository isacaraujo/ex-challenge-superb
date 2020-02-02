import { HttpRequestMethod } from './HttpRequestMethod';
import { IHttpHeaders } from './IHttpHeaders';
import { IHttpQueryParameters } from './IHttpQueryParameters';

interface IHttpRequest {
  Method: HttpRequestMethod;
  Body: any;
  Headers: IHttpHeaders;
  Query: IHttpQueryParameters;
  Params: IHttpRequestParameters;

  getHeader(name: string): string;
}

export { IHttpRequest };
