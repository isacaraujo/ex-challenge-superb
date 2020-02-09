import { IApplicationConfiguration } from '../../Config/IApplicationConfiguration';
import { ILogger } from '../Logger/ILogger';
import { IAdapter } from './Adapter/IAdapter';
import { Rabbitmq } from './Adapter/Rabbitmq/Rabbitmq';
import { Adapters } from './Adapters';

class StartegyFactory {
  public static createAdapter(
    configuration: IApplicationConfiguration,
    logger: ILogger
  ): IAdapter {
    const queueDriver = configuration.queueDriver();

    switch (queueDriver) {
      case Adapters.RABBITMQ:
        return new Rabbitmq(configuration.rabbitmqConfigurations(), logger);
      default:
        return new Rabbitmq(configuration.rabbitmqConfigurations(), logger);
    }
  }
}

export { StartegyFactory };
