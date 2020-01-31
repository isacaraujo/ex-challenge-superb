interface IContainerService {
  register<T>(identifier: symbol, service: () => Promise<T>): void;

  get<T>(identifier: symbol): Promise<T>;
}

const IContainerService = Symbol.for('IContainerService');

export { IContainerService };
