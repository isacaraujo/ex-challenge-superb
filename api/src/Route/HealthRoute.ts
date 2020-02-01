import { IContainerService } from '../Core/Container/IContainerService';
import { IHttpServer } from '../Core/Http/Server/IHttpServer';
import { HttpRequestMethod } from '../Core/Http/Type/HttpRequestMethod';
import { IHealthController } from '../Domain/Health/Controller/IHealthController';
import { BaseRoute } from './BaseRoute';

class HealthRoute extends BaseRoute {
  public constructor(container: IContainerService, httpServer: IHttpServer) {
    super(container, httpServer);
  }

  public async register(): Promise<void> {
    await this.registerHealthRoute();
  }

  private async registerHealthRoute(): Promise<void> {
    const healthController = await this.getController(IHealthController);

    this.addHttpRoute({
      controller: healthController,
      methods: HttpRequestMethod.GET,
      path: '/health',
    });
  }
}

export { HealthRoute };
