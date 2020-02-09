import * as amqplib from 'amqplib';

import { IQueueDefinition } from '../../IQueueDefinition';
import { IQueueAdapter } from '../IQueueAdapter';
import { IChannel } from './IChannel';
import { Queue } from './Queue';

class Channel implements IChannel {
  private static readonly TYPE = 'direct';

  private static readonly DURABLE = true;

  private static readonly AUTO_DELETE = false;

  private static readonly EXCLUSIVE = false;

  private static readonly PREFETCH = 5;

  public constructor(private readonly channel: amqplib.Channel) {
    this.channel.prefetch(Channel.PREFETCH);
  }

  public async createQueue(queueDefinition: IQueueDefinition): Promise<IQueueAdapter> {
    await this.configureExchange(queueDefinition.ExchangeName);
    await this.configureExchange(queueDefinition.ExchangeErrorName);
    await this.configureQueue(queueDefinition);

    return new Queue(this.channel, queueDefinition.QueueName);
  }

  private async configureQueue(queueDefinition: IQueueDefinition): Promise<void> {
    await this.channel.assertQueue(queueDefinition.QueueName, {
      arguments: {
        'x-dead-letter-routing-key': queueDefinition.QueueErrorRoutingKey
      },
      autoDelete: Channel.AUTO_DELETE,
      deadLetterExchange: queueDefinition.ExchangeErrorName,
      durable: Channel.DURABLE,
      exclusive: Channel.EXCLUSIVE
    });

    await this.channel.bindQueue(
      queueDefinition.QueueName,
      queueDefinition.ExchangeName,
      queueDefinition.QueueRoutingKey
    );

    await this.channel.assertQueue(queueDefinition.QueueErrorName, {
      autoDelete: Channel.AUTO_DELETE,
      durable: Channel.DURABLE,
      exclusive: Channel.EXCLUSIVE
    });

    await this.channel.bindQueue(
      queueDefinition.QueueErrorName,
      queueDefinition.ExchangeErrorName,
      queueDefinition.QueueErrorRoutingKey
    );
  }

  private async configureExchange(name: string): Promise<void> {
    await this.channel.assertExchange(name, Channel.TYPE, {
      autoDelete: Channel.AUTO_DELETE,
      durable: Channel.DURABLE
    });
  }
}

export { Channel };
