import * as Commander from 'commander';
import * as Dotenv from 'dotenv';
import * as fs from 'fs';

import { ApplicationConfiguration } from '../../Config/ApplicationConfiguration';
import { ContainerRegistry } from '../../Config/ContainerRegistry';
import { Environments } from '../../Config/Environments';
import { IApplicationConfiguration } from '../../Config/IApplicationConfiguration';
import { IConsoleCommand } from '../../Console/IConsoleCommand';
import { ContainerStrategies } from '../Container/ContainerStrategies';
import { ContainerFactory } from '../Container/Factory/ContainerFactory';
import { IContainerService } from '../Container/IContainerService';
import { INewable } from '../Definition/INewable';
import { IApplicationLoader } from './IApplicationLoader';

class ApplicationLoader implements IApplicationLoader {
  private container?: IContainerService;

  public constructor(private readonly env: Environments) {}

  public command(name: string, newableCommand: INewable<IConsoleCommand>): ApplicationLoader {
    Commander
      .command(name)
      .action(async () => this.invoke(newableCommand));

    return this;
  }

  public async run(): Promise<void> {
    await this.loadEnvironment();

    await this.loadContainers();

    await Commander.parseAsync(process.argv);
  }

  private async invoke(newableCommand: INewable<IConsoleCommand>): Promise<void> {
    const command = new newableCommand(this.container);

    await command.execute();
  }

  private loadEnvironment(): void {
    const commomFiles = [
      '.env',
      `.env.${this.env}`,
      '.env.dist'
    ];
    
    for (let i = 0; i < commomFiles.length; i += 1) {
      const commomFile = commomFiles[i];
    
      if (fs.existsSync(commomFile)) {
        Dotenv.config({ path: commomFile });
    
        console.log(`Env file loaded: ${commomFile}`);
    
        break;
      }
    }
  }

  private loadContainers(): void {
    this.container = ContainerFactory.create(ContainerStrategies.INVERSIFY);

    this.container.register<IApplicationConfiguration>(
      IApplicationConfiguration,
      async () => Promise.resolve(new ApplicationConfiguration())
    );

    ContainerRegistry.registerAll(this.container);
  }
}

export { ApplicationLoader };
