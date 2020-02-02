import { NotFoundError } from '../../../../Core/Error/Http/NotFoundError';

class BookingNotFoundError extends NotFoundError {
  public constructor() {
    const errorType = 'BookingNotFound';
    super('Booking not found', errorType);
  }
}

export { BookingNotFoundError };
