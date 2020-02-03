import { ForbiddenError } from '../../../../Core/Error/Http/ForbiddenError';

class BookingCanceledError extends ForbiddenError {
  public constructor() {
    const errorType = 'BookingCanceled';

    super('Booking is canceled', errorType);
  }
}

export { BookingCanceledError };
