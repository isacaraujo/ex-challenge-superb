import { IApplicationConfiguration } from '../../../Config/IApplicationConfiguration';
import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import { HealthController } from '../Controller/HealthController';
import { IHealthController } from '../Controller/IHealthController';
import { HealthStatusFactory } from '../Factory/HealthStatusFactory';
import { IHealthStatusFactory } from '../Factory/IHealthStatusFactory';

class HealthProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerFactory();
    this.registerController();
  }

  private registerController(): void {
    this.container.register<IHealthController>(
      IHealthController,
      async () => {
          const factory = await this.container.get<IHealthStatusFactory>(IHealthStatusFactory);
          const controller = new HealthController(factory);

          return controller;
      });
  }

  private registerFactory(): void {
    this.container.register<IHealthStatusFactory>(
      IHealthStatusFactory,
      async () => {
        const config = await this.container.get<IApplicationConfiguration>(
          IApplicationConfiguration
        );
        const factory = new HealthStatusFactory(config);

        return factory;
      });
  }
}

export { HealthProvider };
