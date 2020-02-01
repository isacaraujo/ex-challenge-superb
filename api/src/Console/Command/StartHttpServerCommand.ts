import { IApplicationConfiguration } from '../../Config/IApplicationConfiguration';
import { IContainerService } from '../../Core/Container/IContainerService';
import { HttpServerFactory } from '../../Core/Http/Factory/HttpServerFactory';
import { IHttpServer } from '../../Core/Http/Server/IHttpServer';
import { RouteRegistry } from '../../Route/RouteRegistry';
import { IConsoleCommand } from '../IConsoleCommand';

class StartHttpServerCommand implements IConsoleCommand {
  public constructor(
    private readonly container: IContainerService
  ) {}

  public async execute(): Promise<void> {
    const config = await this.container
      .get<IApplicationConfiguration>(IApplicationConfiguration);

    const httpServer = await this.createHttpServer(config);

    await httpServer.start(config.serverHost(), config.serverPort());
  }

  private async createHttpServer(config: IApplicationConfiguration): Promise<IHttpServer> {
    const httpServer = HttpServerFactory.create(config);

    await RouteRegistry.registerAll(this.container, httpServer);

    return httpServer;
  }
}

export { StartHttpServerCommand };
