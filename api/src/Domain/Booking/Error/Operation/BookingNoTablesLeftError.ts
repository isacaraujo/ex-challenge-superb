import { ForbiddenError } from '../../../../Core/Error/Http/ForbiddenError';

class BookingNoTablesLeftError extends ForbiddenError {
  public constructor() {
    const errorType = 'BookingNoTablesLeft';
    const message = 'There is no tables left to be booked';

    super(message, errorType);
  }
}

export { BookingNoTablesLeftError };

