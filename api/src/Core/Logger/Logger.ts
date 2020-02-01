import { ILogger } from './ILogger';

class Logger implements ILogger {
  public constructor(private readonly logger: ILogger) {}

  public debug(message: string, metadata?: any): void {
    this.logger.debug(message, metadata);
  }

  public info(message: string, metadata?: any): void {
    this.logger.info(message, metadata);
  }

  public warning(message: string, metadata?: any): void {
    this.logger.warning(message, metadata);
  }

  public error(message: string, metadata?: any): void {
    this.logger.error(message, metadata);
  }
}

export { Logger };
