import { InternalServerError } from '../../../../Core/Error/Http/InternalServerError';

class CancelBookingGenericError extends InternalServerError {
  public constructor() {
    const errorType = 'CancelBookingGeneric';

    super('Failed while cancel a booking', errorType);
  }
}

export { CancelBookingGenericError };
