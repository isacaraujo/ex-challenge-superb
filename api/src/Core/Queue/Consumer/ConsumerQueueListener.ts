import { ILogger } from '../../Logger/ILogger';
import { IQueue } from '../IQueue';
import { IQueueMessage } from '../Type/Dto/IQueueMessage';
import { IConsumerQueueListener } from './IConsumerQueueListener';
import { IConsumerQueueReceiver } from './IConsumerQueueReceiver';

class ConsumerQueueListener implements IConsumerQueueListener {
  public constructor(
    private readonly logger: ILogger
  ) {}

  public async listen(queue: IQueue, receiver: IConsumerQueueReceiver): Promise<void> {
    this.logger.info(undefined, { event: 'listen', queue: queue.QueueName });

    await queue.subscribe(async (data: IQueueMessage) => this.receive(queue, receiver, data));
  }

  private async receive(
    queue: IQueue,
    receiver: IConsumerQueueReceiver,
    message: IQueueMessage
  ): Promise<void> {
    try {
      this.logger.info(undefined, {
        content: message.Content,
        event: 'recv',
        messageId: message.MessageId,
        queue: queue.QueueName
      });

      await receiver.receive(message);

      this.logger.info(undefined, {
        event: 'ack',
        messageId: message.MessageId,
        queue: queue.QueueName
      });

      await queue.ack(message);
    } catch (error) {
      this.logger.error(undefined, {
        errorMessage: error.message,
        errorStack: error.stack,
        errorType: error.constructor.name,
        event: 'reject',
        messageId: message.MessageId,
        queue: queue.QueueName
      });

      await queue.reject(message);
    }
  }
}

export { ConsumerQueueListener };
