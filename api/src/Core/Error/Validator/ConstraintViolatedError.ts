import { BadRequestError } from '../../Error/Http/BadRequestError';

class ConstraintViolatedError extends BadRequestError {
  private static readonly ORIGINAL_ERROR_TYPE = 'ConstraintViolated';

  public readonly details: any;

  public constructor(message: string, details: any) {
    super(message, ConstraintViolatedError.ORIGINAL_ERROR_TYPE);

    this.details = details;
  }
}

export { ConstraintViolatedError };
