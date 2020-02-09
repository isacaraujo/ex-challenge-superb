import { IConsumerQueueReceiver } from './Consumer/IConsumerQueueReceiver';
import { IQueue } from './IQueue';

interface IConsumerQueue {
  QueueName: string;
  Queue: IQueue;
  Receiver: IConsumerQueueReceiver;
}

export { IConsumerQueue };
