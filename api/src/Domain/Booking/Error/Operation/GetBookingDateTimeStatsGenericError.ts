import { InternalServerError } from '../../../../Core/Error/Http/InternalServerError';

class GetBookingDateTimeStatsGenericError extends InternalServerError {
  public constructor() {
    const errorType = 'GetBookingDateTimeStatsGeneric';

    super('Get booking stats failed', errorType);
  }
}

export { GetBookingDateTimeStatsGenericError };
