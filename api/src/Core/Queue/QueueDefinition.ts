import { IQueueDefinition } from './IQueueDefinition';

class QueueDefinition implements IQueueDefinition {
  public constructor(
    private readonly queueName: string,
    private readonly queueErrorName: string,
    private readonly exchangeName: string,
    private readonly exchangeErrorName: string,
    private readonly queueRoutingKey: string,
    private readonly queueErrorRoutingKey: string
  ) {}

  public get QueueName(): string {
    return this.queueName;
  }

  public get QueueErrorName(): string {
    return this.queueErrorName;
  }

  public get ExchangeName(): string {
    return this.exchangeName;
  }

  public get ExchangeErrorName(): string {
    return this.exchangeErrorName;
  }

  public get QueueRoutingKey(): string {
    return this.queueRoutingKey;
  }

  public get QueueErrorRoutingKey(): string {
    return this.queueErrorRoutingKey;
  }
}

export { QueueDefinition };
