import { IContainerService } from '../Core/Container/IContainerService';
import { IActionController } from '../Core/Controller/IActionController';
import { IHttpRoute } from '../Core/Http/Server/IHttpRoute';
import { IHttpServer } from '../Core/Http/Server/IHttpServer';
import { IHttpMiddleware } from '../Core/Middleware/IHttpMiddleware';
import { IRoute } from './IRoute';

abstract class BaseRoute implements IRoute {
  public constructor(
    protected readonly container: IContainerService,
    protected readonly httpServer: IHttpServer
  ) {}

  public abstract register(): Promise<void>;

  protected addHttpRoute(route: IHttpRoute): void {
    route.path = route.version === undefined
      ? route.path
      : `/${route.version}${route.path}`;

    this.httpServer.route(route);
  }

  protected async getController(controllerName: symbol): Promise<IActionController> {
    return this.container.get<IActionController>(controllerName);
  }

  protected async getMiddleware(name: symbol): Promise<IHttpMiddleware> {
    return this.container.get<IHttpMiddleware>(name);
  }
}

export { BaseRoute };
