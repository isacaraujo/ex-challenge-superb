import { InternalServerError } from '../../../../Core/Error/Http/InternalServerError';

class UpdateBookingGenericError extends InternalServerError {
  public constructor() {
    const errorType = 'UpdateBookingGeneric';

    super('Failed while update a booking', errorType);
  }
}

export { UpdateBookingGenericError };
