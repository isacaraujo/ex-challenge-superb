import { InternalServerError } from './InternalServerError';

class UnhandledError extends InternalServerError {
  public readonly originalError: Error;

  public constructor(error: Error) {
    super(`Caught an unknown error: ${error.message}`, error.constructor.name);

    this.originalError = error;
  }
}

export { UnhandledError };
