import { IQueueMessage } from '../Type/Dto/IQueueMessage';
import { TQueueAdapterSubscribe } from './TQueueAdapterSubscribe';

interface IQueueAdapter {
  publish(data: any): Promise<void>;
  subscribe(callback: TQueueAdapterSubscribe<IQueueMessage>): Promise<void>;
  ack(messsage: IQueueMessage): Promise<void>;
  reject(messsage: IQueueMessage): Promise<void>;
  retry(messsage: IQueueMessage): Promise<void>;
}

const IQueueAdapter = Symbol.for('IQueueAdapter');

export { IQueueAdapter };
