import { IQueueDefinition } from '../../IQueueDefinition';
import { IQueueAdapter } from '../IQueueAdapter';

interface IChannel {
  createQueue(queueDefinition: IQueueDefinition): Promise<IQueueAdapter>;
}

const IChannel = Symbol.for('IChannel');

export { IChannel };
