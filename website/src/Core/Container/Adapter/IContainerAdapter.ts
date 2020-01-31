interface IContainerAdapter {
  register<T>(identifier: symbol, service: () => Promise<T>): void;

  get<T>(identifier: symbol): Promise<T>;
}

const IContainerAdapter = Symbol.for('IContainerAdapter');

export { IContainerAdapter };
