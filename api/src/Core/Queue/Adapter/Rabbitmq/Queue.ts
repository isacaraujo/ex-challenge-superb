import * as amqplib from 'amqplib';
import { IQueueMessage } from '../../Type/Dto/IQueueMessage';
import { QueueMessage } from '../../Type/Dto/QueueMessage';
import { IQueueAdapter } from '../IQueueAdapter';
import { TQueueAdapterSubscribe } from '../TQueueAdapterSubscribe';

class Queue implements IQueueAdapter {
  public constructor(
    private readonly channel: amqplib.Channel,
    private readonly queueName: string
  ) {}

  public async publish(data: any): Promise<void> {
    this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(data)));
  }

  public async subscribe(callback: TQueueAdapterSubscribe<IQueueMessage>): Promise<void> {
    await this.channel.consume(this.queueName, async (data: amqplib.ConsumeMessage) => {
      const message: IQueueMessage = new QueueMessage(
        data.content.toString(),
        String(data.fields.deliveryTag)
      );

      await callback(message);
    });
  }

  public async ack(messsage: IQueueMessage): Promise<void> {
    const consumeMessage = {
      fields: { deliveryTag: Number(messsage.MessageId) }
    };

    this.channel.ack(consumeMessage as amqplib.ConsumeMessage);
  }

  public async reject(messsage: IQueueMessage): Promise<void> {
    const consumeMessage = {
      fields: { deliveryTag: Number(messsage.MessageId) }
    };

    this.channel.reject(consumeMessage as amqplib.ConsumeMessage, false);
  }

  public async retry(messsage: IQueueMessage): Promise<void> {
    const consumeMessage = {
      fields: { deliveryTag: Number(messsage.MessageId) }
    };

    this.channel.reject(consumeMessage as amqplib.ConsumeMessage, true);
  }
}

export { Queue };
