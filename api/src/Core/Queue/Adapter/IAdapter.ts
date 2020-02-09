import { IQueue } from '../IQueue';
import { IQueueDefinition } from '../IQueueDefinition';

interface IAdapter {
  setup(): Promise<void>;
  createQueue(queueDefinition: IQueueDefinition): Promise<IQueue>;
}

const IAdapter = Symbol.for('IAdapter');

export { IAdapter };
