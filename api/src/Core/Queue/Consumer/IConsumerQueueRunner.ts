import { IConsumerQueue } from '../IConsumerQueue';

interface IConsumerQueueRunner {
  addConsumer(consumer: IConsumerQueue): IConsumerQueueRunner;

  run(queueName: string): Promise<void>;
}

const IConsumerQueueRunner = Symbol.for('IConsumerQueueRunner');

export { IConsumerQueueRunner };
