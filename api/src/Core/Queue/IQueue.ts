import { TQueueSubscribe } from './TQueueSubscribe';
import { IQueueMessage } from './Type/Dto/IQueueMessage';

interface IQueue {
  QueueName: string;
  publish(data: any): Promise<void>;
  subscribe(callback: TQueueSubscribe<IQueueMessage>): Promise<void>;
  ack(messsage: IQueueMessage): Promise<void>;
  reject(messsage: IQueueMessage): Promise<void>;
  retry(messsage: IQueueMessage): Promise<void>;
}

const IQueue = Symbol.for('IQueue');

export { IQueue };
