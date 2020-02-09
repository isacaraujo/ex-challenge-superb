import * as amqplib from 'amqplib';
import * as deasync from 'deasync';

import { ILogger } from '../../../Logger/ILogger';
import { IQueue } from '../../IQueue';
import { IQueueDefinition } from '../../IQueueDefinition';
import { Queue } from '../../Queue';
import { IAdapter } from '../IAdapter';
import { Channel } from './Channel';
import { IChannel } from './IChannel';
import { IRabitmqConfiguration } from './IRabitmqConfiguration';

class Rabbitmq implements IAdapter {
  private conn: amqplib.Connection;

  public constructor(
    private readonly configuration: IRabitmqConfiguration,
    private readonly logger: ILogger
  ) {}

  public async createChannel(): Promise<IChannel> {
    const channel = await this.conn.createChannel();

    return new Channel(channel);
  }

  public async createQueue(queueDefinition: IQueueDefinition): Promise<IQueue> {
    const channel = await this.createChannel();
    const adapterQueue = await channel.createQueue(queueDefinition);

    return new Queue(adapterQueue, queueDefinition.QueueName);
  }

  public async setup(): Promise<void> {
    const factor = 1000;
    let sleep = 1000;
    let retryCount = 0;

    while (this.conn === undefined) {
      try {
        await this.createConnection();

        this.logger.info('Rabbitmq connected!');
      } catch (error) {
        retryCount += 1;
        sleep = factor * retryCount;

        this.logger.warning('Error on rabbitmq connection.', error);
        this.logger.info(`Retry connection in...${sleep}`);

        deasync.sleep(sleep);
      }
    }
  }

  private async createConnection(): Promise<void> {
    this.conn = await amqplib.connect({
      hostname: this.configuration.hostname,
      password: this.configuration.password,
      port: this.configuration.port,
      username: this.configuration.username,
      vhost: this.configuration.vhost
    });
  }
}

export { Rabbitmq };
