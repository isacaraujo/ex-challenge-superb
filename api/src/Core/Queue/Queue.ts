import { IQueueAdapter } from './Adapter/IQueueAdapter';
import { IQueue } from './IQueue';
import { TQueueSubscribe } from './TQueueSubscribe';
import { IQueueMessage } from './Type/Dto/IQueueMessage';

class Queue implements IQueue {
  public constructor(
    private readonly adapter: IQueueAdapter,
    private readonly queueName: string
  ) {}

  public get QueueName(): string {
    return this.queueName;
  }

  public async publish(data: any): Promise<void> {
    await this.adapter.publish(data);
  }

  public async subscribe(callback: TQueueSubscribe<IQueueMessage>): Promise<void> {
    await this.adapter.subscribe(callback);
  }

  public async ack(data: IQueueMessage): Promise<void> {
    await this.adapter.ack(data);
  }

  public async reject(data: IQueueMessage): Promise<void> {
    await this.adapter.reject(data);
  }

  public async retry(data: IQueueMessage): Promise<void> {
    await this.adapter.retry(data);
  }
}

export { Queue };
