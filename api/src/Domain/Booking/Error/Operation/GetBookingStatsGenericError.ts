import { InternalServerError } from '../../../../Core/Error/Http/InternalServerError';

class GetBookingStatsGenericError extends InternalServerError {
  public constructor() {
    const errorType = 'GetBookingStatsGeneric';

    super('Get booking stats failed', errorType);
  }
}

export { GetBookingStatsGenericError };

