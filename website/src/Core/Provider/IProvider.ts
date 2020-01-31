interface IProvider {
  register(): void;
}

const IProvider = Symbol.for('IProvider');

export { IProvider };
