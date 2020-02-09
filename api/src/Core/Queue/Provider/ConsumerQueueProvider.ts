import { IContainerService } from '../../Container/IContainerService';
import { ILogger } from '../../Logger/ILogger';
import { IProvider } from '../../Provider/IProvider';
import { ConsumerQueueListener } from '../Consumer/ConsumerQueueListener';
import { ConsumerQueueRunner } from '../Consumer/ConsumerQueueRunner';
import { IConsumerQueueListener } from '../Consumer/IConsumerQueueListener';
import { IConsumerQueueRunner } from '../Consumer/IConsumerQueueRunner';

class ConsumerQueueProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerConsumerQueueListener();
    this.registerConsumerQueueRunner();
  }

  private registerConsumerQueueListener(): void {
    this.container.register(
      IConsumerQueueListener,
      async () => {
        const logger = await this.container.get<ILogger>(ILogger);

        const listener = new ConsumerQueueListener(logger);

        return listener;
      });
  }

  private registerConsumerQueueRunner(): void {
    this.container.register(
      IConsumerQueueRunner,
      async () => {
        const listener = await this.container.get<IConsumerQueueListener>(IConsumerQueueListener);

        return new ConsumerQueueRunner(listener);
      });
  }
}

export { ConsumerQueueProvider };
