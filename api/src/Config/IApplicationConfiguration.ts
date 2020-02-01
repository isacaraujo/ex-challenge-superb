import { IKoaHttpServerOptions } from '../Core/Http/Server/Adapter/Koa/IKoaHttpServerOptions';
import { IWinstonConfiguration } from '../Core/Logger/Driver/Winston/IWinstonConfiguration';

interface IApplicationConfiguration {
  serverHost(): string;
  serverPort(): number;
  koaConfig(): IKoaHttpServerOptions;
  timezone(): string;
  winstonOptions(): IWinstonConfiguration;
  databaseUrl(): string;
}

const IApplicationConfiguration = Symbol.for('IApplicationConfiguration');

export { IApplicationConfiguration };
