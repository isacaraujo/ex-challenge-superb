import * as Koa from 'koa';

import { HttpRequestMethod } from '../../../Type/HttpRequestMethod';
import { IHttpHeaders } from '../../../Type/IHttpHeaders';
import { IHttpQueryParameters } from '../../../Type/IHttpQueryParameters';
import { IHttpRequest } from '../../../Type/IHttpRequest';

class KoaHttpRequest implements IHttpRequest {
  public constructor(
    private readonly context: Koa.Context
  ) {}

  public get Method(): HttpRequestMethod {
    return this.context.request.method as HttpRequestMethod;
  }

  public get Body(): string {
    return this.context.request.body;
  }

  public get Headers(): IHttpHeaders {
    return this.context.headers as IHttpHeaders;
  }

  public get Query(): IHttpQueryParameters {
    return this.context.query as IHttpQueryParameters;
  }

  public get Params(): IHttpRequestParameters {
    return this.context.params as IHttpRequestParameters;
  }

  public getHeader(name: string): string {
    return this.context.headers[name];
  }
}

export { KoaHttpRequest };
