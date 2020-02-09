import { IContainerService } from '../../Core/Container/IContainerService';
import { IConsumerQueue } from '../../Core/Queue/IConsumerQueue';
import { INextPendingBookingQueue } from '../../Domain/Booking/Queue/INextPendingBookingQueue';
import { QueueNames } from '../Type/QueueNames';
import { IConsumerFactory } from './IConsumerFactory';
import { INextPendingBookingConsumer } from '../../Domain/Booking/Consumer/INextPendingBookingConsumer';

class NextPendingBookingConsumerFactory implements IConsumerFactory {
  public constructor(private readonly container: IContainerService) {}

  public async create(): Promise<IConsumerQueue> {
    const queue = await this.container
      .get<INextPendingBookingQueue>(INextPendingBookingQueue);

    const receiver = await this.container
      .get<INextPendingBookingConsumer>(INextPendingBookingConsumer);

    return {
      QueueName: QueueNames.NEXT_PENDING_BOOKING,
      Queue: queue,
      Receiver: receiver,
    };
  }
}

export { NextPendingBookingConsumerFactory };
