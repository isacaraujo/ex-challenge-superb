import { IKoaHttpServerOptions } from '../Core/Http/Server/Adapter/Koa/IKoaHttpServerOptions';
import { IWinstonConfiguration } from '../Core/Logger/Driver/Winston/IWinstonConfiguration';
import { IRabitmqConfiguration } from '../Core/Queue/Adapter/Rabbitmq/IRabitmqConfiguration';
import { Adapters as QueueAdapters } from '../Core/Queue/Adapters';
import { IApplicationConfiguration } from './IApplicationConfiguration';
import { TLoggingLevels } from '../Core/Logger/TLoggingLevel';

class ApplicationConfiguration implements IApplicationConfiguration {
  public serverHost(): string {
    return process.env.HTTP_SERVER_HOST;
  }

  public serverPort(): number {
    return Number(process.env.HTTP_SERVER_PORT);
  }

  public koaConfig(): IKoaHttpServerOptions {
    return {
      corsOrigin: process.env.KOA_CORS_ORIGIN,
    };
  }

  public timezone(): string {
    return process.env.TIMEZONE;
  }

  public winstonOptions(): IWinstonConfiguration {
    return {
      logLevel: process.env.LOG_LEVEL as TLoggingLevels,
      consoleLogEnabled: true,
      combinedFileLogEnabled: false,
      errorFileLogEnabled: false,
    };
  }

  public databaseUrl(): string {
    return process.env.MONGO_URL;
  }

  public queueDriver(): QueueAdapters {
    return QueueAdapters.RABBITMQ;
  }

  public rabbitmqConfigurations(): IRabitmqConfiguration {
    return {
      hostname: process.env.RABBIT_HOST,
      port: Number(process.env.RABBIT_PORT),
      vhost: process.env.RABBIT_VHOST,
      username: process.env.RABBIT_USERNAME,
      password: process.env.RABBIT_PASSWORD,
    };
  }
}

export { ApplicationConfiguration };
