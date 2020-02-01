import * as Koa from 'koa';
import * as KoaBodyParser from 'koa-bodyparser';
import * as KoaRouter from 'koa-router';
import * as _ from 'lodash';

import * as cors from '@koa/cors';

import { IHttpMiddleware } from '../../../../Middleware/IHttpMiddleware';
import { HttpResponseFactory } from '../../../Factory/HttpResponseFactory';
import { IHttpRequest } from '../../../Type/IHttpRequest';
import { IHttpResponse } from '../../../Type/IHttpResponse';
import { IHttpRoute } from '../../IHttpRoute';
import { IHttpServer } from '../../IHttpServer';
import { IKoaHttpServerOptions } from './IKoaHttpServerOptions';
import { KoaHttpRequest } from './KoaHttpRequest';

class KoaHttpServer implements IHttpServer {
  private readonly server: Koa;

  public constructor(options: IKoaHttpServerOptions) {
    this.server = new Koa();

    this.server.proxy = true;

    this.server.use(KoaBodyParser());

    this.server.use(cors({
      origin: options.corsOrigin,
    }));
  }

  public route(route: IHttpRoute): IHttpServer {
    const handleRequest = async (
      httpRoute: IHttpRoute,
      context: Koa.Context
    ): Promise<Koa.Context> => this.handleRequest(httpRoute, context);

    const koaRouter = new KoaRouter<any, any>();
    const requestMethod = route.methods.toString().toLowerCase();

    koaRouter[requestMethod](
      route.path,
      async (context: Koa.Context): Promise<Koa.Context> => handleRequest(route, context)
    );

    this.server.use(koaRouter.routes());

    return this;
  }

  public async start(host: string, port: number): Promise<void> {
    return new Promise((_, reject) => {
      this.server
        .listen(port, host, (error?: any): void => {
          if (error) {
            reject(error);

            return;
          }

          console.log(`koa listen ${host}:${port}`);
        })
        .on('error', (e) => {
          reject(e);
        });
    });
  }

  private async executeBeforeMiddlewares(
    middlewares: IHttpMiddleware[],
    request: IHttpRequest
  ): Promise<IHttpResponse> {
    for (let i = 0; i < middlewares.length; i += 1) {
      const middleware = middlewares[i];

      const httpResponse = await middleware.perform(request);

      if (!_.isUndefined(httpResponse)) {
        return httpResponse;
      }
    }
  }

  private async handleRequest(
    route: IHttpRoute,
    context: Koa.Context
  ): Promise<Koa.Context> {
    try {
      const httpRequest = this.createHttpRequest(context);

      let httpResponse: IHttpResponse;

      if (!_.isUndefined(route.before)) {
        httpResponse = await this.executeBeforeMiddlewares(route.before, httpRequest);
      }

      if (_.isUndefined(httpResponse)) {
        httpResponse = await route.controller.perform(httpRequest);
      }

      context.status = httpResponse.StatusCode;

      context.body = httpResponse.Body;

      return context;
    } catch (error) {
      console.log('koa caught an error');
      console.error(error);
      const errorResponse = HttpResponseFactory.createErrorResponse(error);

      context.status = errorResponse.StatusCode;

      context.body = errorResponse.Body;

      return context;
    }
  }

  private createHttpRequest(context: Koa.Context): IHttpRequest {
    return new KoaHttpRequest(context);
  }
}

export { KoaHttpServer };
