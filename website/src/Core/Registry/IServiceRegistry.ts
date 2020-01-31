interface IServiceRegistry {
  registerAll(): void;
}

const IServiceRegistry = Symbol.for('IServiceRegistry');

export { IServiceRegistry };
