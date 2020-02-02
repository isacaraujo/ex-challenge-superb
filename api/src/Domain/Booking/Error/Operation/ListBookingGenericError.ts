import { InternalServerError } from '../../../../Core/Error/Http/InternalServerError';

class ListBookingGenericError extends InternalServerError {
  public constructor() {
    const errorType = 'ListBookingGeneric';

    super('List booking failed', errorType);
  }
}

export { ListBookingGenericError };
