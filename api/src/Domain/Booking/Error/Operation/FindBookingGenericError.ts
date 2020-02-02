import { InternalServerError } from '../../../../Core/Error/Http/InternalServerError';

class FindBookingGenericError extends InternalServerError {
  public constructor() {
    super('Unable to find a booking', 'FindBookingGeneric');
  }
}

export { FindBookingGenericError };
