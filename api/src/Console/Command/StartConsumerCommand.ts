import { ConsumerRegistry } from '../../Consumer/ConsumerRegistry';
import { QueueNames } from '../../Consumer/Type/QueueNames';
import { IContainerService } from '../../Core/Container/IContainerService';
import { IConsumerQueueRunner } from '../../Core/Queue/Consumer/IConsumerQueueRunner';
import { IConsoleCommand } from '../IConsoleCommand';

class StartConsumerCommand implements IConsoleCommand {
  public constructor(
    private readonly container: IContainerService
  ) {}

  public async execute(): Promise<void> {
    const runner = await this.createConsumerRunner();

    await this.createConsumerRunner();

    await runner.run(QueueNames.NEXT_PENDING_BOOKING);
  }

  private async createConsumerRunner(): Promise<IConsumerQueueRunner> {
    const runner = await this.container
      .get<IConsumerQueueRunner>(IConsumerQueueRunner);

    await ConsumerRegistry.registerAll(this.container, runner);

    return runner;
  }
}

export { StartConsumerCommand };
