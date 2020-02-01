import { IApplicationConfiguration } from '../../../Config/IApplicationConfiguration';
import { KoaHttpServer } from '../Server/Adapter/Koa/KoaHttpServer';
import { IHttpServer } from '../Server/IHttpServer';

class HttpServerFactory {
  public static create(config: IApplicationConfiguration): IHttpServer {
    const koaOptions = config.koaConfig();

    return new KoaHttpServer(koaOptions);
  }
}

export { HttpServerFactory };
