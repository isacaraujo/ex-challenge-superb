interface IApplicationConfiguration {
  httpBaseUrl(): string;
}

const IApplicationConfiguration = Symbol.for('IApplicationConfiguration');

export { IApplicationConfiguration };
