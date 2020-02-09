import { IContainerService } from '../Core/Container/IContainerService';
import { INewable } from '../Core/Definition/INewable';
import { IConsumerQueueRunner } from '../Core/Queue/Consumer/IConsumerQueueRunner';
import { IConsumerFactory } from './Factory/IConsumerFactory';
import { NextPendingBookingConsumerFactory } from './Factory/NextPendingBookingConsumerFactory';

class ConsumerRegistry {
  private static readonly CONSUMER_FACTORIES: INewable<IConsumerFactory>[] = [
    NextPendingBookingConsumerFactory,
  ];

  public static async registerAll(container: IContainerService, runner: IConsumerQueueRunner): Promise<void> {
    const length = ConsumerRegistry.CONSUMER_FACTORIES.length;

    for (let i = 0; i < length; i += 1) {
      await ConsumerRegistry.registerRoute(
        ConsumerRegistry.CONSUMER_FACTORIES[i],
        container,
        runner
      );
    }
  }

  public static async registerRoute(
    newableFactory: INewable<IConsumerFactory>,
    container: IContainerService,
    runner: IConsumerQueueRunner
  ): Promise<void> {
    const factory = new newableFactory(container);

    const consumer = await factory.create();

    runner.addConsumer(consumer);
  }
}

export { ConsumerRegistry };
