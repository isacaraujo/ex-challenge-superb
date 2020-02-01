import { IApplicationConfiguration } from '../../Config/IApplicationConfiguration';

import { IWinstonConfiguration } from './Driver/Winston/IWinstonConfiguration';
import { Winston } from './Driver/Winston/Winston';
import { ILogger } from './ILogger';
import { Logger } from './Logger';

class StartegyFactory {
  public static async createLogger(
    configuration: IApplicationConfiguration
  ): Promise<ILogger> {
    return StartegyFactory.createWinstonLogger(configuration);
  }

  private static createWinstonLogger(configuration: IApplicationConfiguration): ILogger {
    const winstonConfig: IWinstonConfiguration = configuration.winstonOptions();

    const driver = new Winston(winstonConfig);

    return new Logger(driver);
  }
}

export { StartegyFactory };
