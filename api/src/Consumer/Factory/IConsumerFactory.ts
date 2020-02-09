import { IConsumerQueue } from '../../Core/Queue/IConsumerQueue';

interface IConsumerFactory {
  create(): Promise<IConsumerQueue>;
}

const IConsumerFactory = Symbol.for('IConsumerFactory');

export { IConsumerFactory };
