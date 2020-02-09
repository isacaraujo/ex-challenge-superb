import { IQueue } from './IQueue';
import { IQueueDefinition } from './IQueueDefinition';

interface IQueueFactory {
  createQueue(queueDefinition: IQueueDefinition): Promise<IQueue>;
}

const IQueueFactory = Symbol.for('IQueueFactory');

export { IQueueFactory };
