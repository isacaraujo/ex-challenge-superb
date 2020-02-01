import { InternalServerError } from '../../../../Core/Error/Http/InternalServerError';

class CreateBookingGenericError extends InternalServerError {
  public constructor(message: string) {
    const errorType = 'CreateBookingGeneric';

    super(`CreateBookingGenericError: ${message}`, errorType);
  }
}

export { CreateBookingGenericError };
