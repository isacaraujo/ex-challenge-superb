import { IKoaHttpServerOptions } from '../Core/Http/Server/Adapter/Koa/IKoaHttpServerOptions';
import { IWinstonConfiguration } from '../Core/Logger/Driver/Winston/IWinstonConfiguration';
import { IRabitmqConfiguration } from '../Core/Queue/Adapter/Rabbitmq/IRabitmqConfiguration';
import { Adapters as QueueAdapters } from '../Core/Queue/Adapters';

interface IApplicationConfiguration {
  serverHost(): string;
  serverPort(): number;
  koaConfig(): IKoaHttpServerOptions;
  timezone(): string;
  winstonOptions(): IWinstonConfiguration;
  databaseUrl(): string;
  queueDriver(): QueueAdapters;
  rabbitmqConfigurations(): IRabitmqConfiguration;
}

const IApplicationConfiguration = Symbol.for('IApplicationConfiguration');

export { IApplicationConfiguration };
