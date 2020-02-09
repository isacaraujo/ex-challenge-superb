import { QueueNames } from '../../../Consumer/Type/QueueNames';
import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import { IQueueFactory } from '../../../Core/Queue/IQueueFactory';
import { QueueDefinition } from '../../../Core/Queue/QueueDefinition';
import { INextPendingBookingQueue } from '../Queue/INextPendingBookingQueue';

class BookingQueueProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerNextPendingBookingQueue();
  }

  private registerNextPendingBookingQueue(): void {
    this.container.register(
      INextPendingBookingQueue,
      async () => {
        const queueFactory = await this.container.get<IQueueFactory>(IQueueFactory);

        const queueName = QueueNames.NEXT_PENDING_BOOKING;
        const errorQueue = `${queueName}_error`;
        const exchange = queueName;
        const errorExchange = `${queueName}_error`;
        const queueRoutingKey = `send_${QueueNames.NEXT_PENDING_BOOKING}`;
        const queueErrorRoutingKey = `send_${QueueNames.NEXT_PENDING_BOOKING}_error`;

        const queueDefinition = new QueueDefinition(
          queueName,
          errorQueue,
          exchange,
          errorExchange,
          queueRoutingKey,
          queueErrorRoutingKey
        );

        return await queueFactory.createQueue(queueDefinition);
      });
  }
}

export { BookingQueueProvider };
