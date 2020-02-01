import { INewable } from '../Definition/INewable';
import { IConsoleCommand } from '../../Console/IConsoleCommand';

interface IApplicationLoader {
  command(name: string, newableCommand: INewable<IConsoleCommand>): void;

  run(): Promise<void>;
}

const IApplicationLoader = Symbol.for('IApplicationLoader');

export { IApplicationLoader };
