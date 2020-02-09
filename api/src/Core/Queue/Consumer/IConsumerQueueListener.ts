import { IQueue } from '../IQueue';
import { IConsumerQueueReceiver } from './IConsumerQueueReceiver';

interface IConsumerQueueListener {
  listen(queue: IQueue, receiver: IConsumerQueueReceiver): Promise<void>;
}

const IConsumerQueueListener = Symbol.for('IConsumerQueueListener');

export { IConsumerQueueListener };
