import { IApplicationConfiguration } from '../../../Config/IApplicationConfiguration';
import { IContainerService } from '../../Container/IContainerService';
import { IProvider } from '../../Provider/IProvider';
import { ILogger } from '../ILogger';
import { StartegyFactory } from '../StrategyFactory';

class LoggerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public async register(): Promise<void> {
    return new Promise(resolve => {
      this.registerLogger();

      resolve();
    });
  }

  private registerLogger(): void {
    this.container.register<ILogger>(
      ILogger,
      async () =>
        new Promise<ILogger>(async resolve => {
          const configuration = await this.container.get<IApplicationConfiguration>(
            IApplicationConfiguration
          );

          const logger = await StartegyFactory.createLogger(configuration);

          resolve(logger);
        })
    );
  }
}

export { LoggerProvider };
