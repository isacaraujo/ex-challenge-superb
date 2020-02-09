import { IKoaHttpServerOptions } from '../Core/Http/Server/Adapter/Koa/IKoaHttpServerOptions';
import { IWinstonConfiguration } from '../Core/Logger/Driver/Winston/IWinstonConfiguration';
import { IRabitmqConfiguration } from '../Core/Queue/Adapter/Rabbitmq/IRabitmqConfiguration';
import { Adapters as QueueAdapters } from '../Core/Queue/Adapters';
import { IApplicationConfiguration } from './IApplicationConfiguration';

class ApplicationConfiguration implements IApplicationConfiguration {
  public serverHost(): string {
    return '0.0.0.0';
  }

  public serverPort(): number {
    return 3000;
  }

  public koaConfig(): IKoaHttpServerOptions {
    return {
      corsOrigin: '*',
    };
  }

  public timezone(): string {
    return 'UTC';
  }

  public winstonOptions(): IWinstonConfiguration {
    return {
      logLevel: 'debug',
      consoleLogEnabled: true,
      combinedFileLogEnabled: false,
      errorFileLogEnabled: false,
    };
  }

  public databaseUrl(): string {
    return 'mongodb://superb-mongo:27017/superb?poolSize=4';
  }

  public queueDriver(): QueueAdapters {
    return QueueAdapters.RABBITMQ;
  }

  public rabbitmqConfigurations(): IRabitmqConfiguration {
    return {
      hostname: 'superb-rabbitmq',
      port: 5672,
      vhost: 'local',
      username: 'root',
      password: 'root',
    };
  }
}

export { ApplicationConfiguration };
