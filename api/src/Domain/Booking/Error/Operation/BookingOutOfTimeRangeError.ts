import { ForbiddenError } from '../../../../Core/Error/Http/ForbiddenError';

class BookingOutOfTimeRangeError extends ForbiddenError {
  public constructor(bookingTime: number, restaurantOpenTime: number, restaurantCloseTime: number) {
    const errorType = 'BookingOutOfTimeRange';
    const message = `Selected time ${bookingTime} must be between ${restaurantOpenTime} and ${restaurantCloseTime}`;

    super(message, errorType);
  }
}

export { BookingOutOfTimeRangeError };
