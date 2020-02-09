import { IApplicationConfiguration } from '../../../Config/IApplicationConfiguration';
import { IContainerService } from '../../Container/IContainerService';
import { ILogger } from '../../Logger/ILogger';
import { IProvider } from '../../Provider/IProvider';
import { IQueueFactory } from '../IQueueFactory';
import { QueueFactory } from '../QueueFactory';
import { StartegyFactory } from '../StrategyFactory';

class QueueProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerQueueFactory();
  }

  private registerQueueFactory(): void {
    this.container.register<IQueueFactory>(
      IQueueFactory,
      async () => {
        const configuration = await this.container
          .get<IApplicationConfiguration>(IApplicationConfiguration);

        const logger = await this.container
          .get<ILogger>(ILogger);

        const queueAdapter = StartegyFactory.createAdapter(configuration, logger);

        await queueAdapter.setup();

        return new QueueFactory(queueAdapter);
      });
  }
}

export { QueueProvider };
