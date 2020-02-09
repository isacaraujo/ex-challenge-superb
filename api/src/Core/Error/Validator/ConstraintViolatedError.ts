import { BadRequestError } from '../../Error/Http/BadRequestError';

class ConstraintViolatedError extends BadRequestError {
  private static readonly ORIGINAL_ERROR_TYPE = 'ConstraintViolated';

  public readonly originalError: Error;

  public constructor(message: string, originalError: Error) {
    super(message, ConstraintViolatedError.ORIGINAL_ERROR_TYPE);

    this.originalError = originalError;
  }
}

export { ConstraintViolatedError };
