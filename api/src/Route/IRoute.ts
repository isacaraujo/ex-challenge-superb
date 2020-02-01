interface IRoute {
  register(): void;
}

const IRoute = Symbol.for('IRoute');

export { IRoute };
