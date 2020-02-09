import { ConsumerQueueNotFoundError } from '../../Error/Consumer/ConsumerQueueNotFoundError';
import { IConsumerQueue } from '../IConsumerQueue';
import { IConsumerQueueListener } from './IConsumerQueueListener';
import { IConsumerQueueRunner } from './IConsumerQueueRunner';

class ConsumerQueueRunner implements IConsumerQueueRunner {
  private consumers: IConsumerQueue[] = [];

  public constructor(
    private readonly queueListener: IConsumerQueueListener
  ) {}

  public addConsumer(consumer: IConsumerQueue): IConsumerQueueRunner {
    this.consumers.push(consumer);

    return this;
  }

  public async run(queueName: string): Promise<void> {
    const consumer = this.consumers.find(consumer => consumer.QueueName === queueName);

    if (undefined === consumer) {
      throw new ConsumerQueueNotFoundError(queueName);
    }

    await this.queueListener.listen(consumer.Queue, consumer.Receiver);
  }
}

export { ConsumerQueueRunner };
