import { IAdapter } from './Adapter/IAdapter';
import { IQueue } from './IQueue';
import { IQueueDefinition } from './IQueueDefinition';
import { IQueueFactory } from './IQueueFactory';

class QueueFactory implements IQueueFactory {
  public constructor(private readonly adapter: IAdapter) {}

  public async createQueue(queueDefinition: IQueueDefinition): Promise<IQueue> {
    return this.adapter.createQueue(queueDefinition);
  }
}

export { QueueFactory };
