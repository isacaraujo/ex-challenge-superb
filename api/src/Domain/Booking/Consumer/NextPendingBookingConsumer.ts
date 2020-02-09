import { INextPendingBookingConsumer } from './INextPendingBookingConsumer';
import { IQueueMessage } from '../../../Core/Queue/Type/Dto/IQueueMessage';

class NextPendingBookingConsumer implements INextPendingBookingConsumer {
  public constructor() {}

  public async receive(message: IQueueMessage): Promise<void> {
    console.log('message', message);

    return Promise.resolve();
  }
}

export { NextPendingBookingConsumer };
