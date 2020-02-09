import { AggregateRecordError } from '../../../Core/Error/Repository/AggregateRecordError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { Restaurant } from '../../Restaurant/Entity/Restaurant';
import { BookingStats } from '../Entity/BookingStats';
import {
    GetBookingDateTimeStatsGenericError
} from '../Error/Operation/GetBookingDateTimeStatsGenericError';
import { IBookingStatsRepository } from '../Repository/IBookingStatsRepository';
import { IGetBookingDateTimeStatsOperation } from './IGetBookingDateTimeStatsOperation';

class GetBookingDateTimeStatsOperation implements IGetBookingDateTimeStatsOperation {
  public constructor(
    private readonly bookingStatsRepository: IBookingStatsRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(restaurant: Restaurant, date: string, time: number): Promise<BookingStats> {
    try {
      return await this.bookingStatsRepository.consolidateByDateAndTime(restaurant, date, time);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case AggregateRecordError:
        const aggregateError = error as AggregateRecordError;
        this.logger.error(
          `GetBookingDateTimeStatsGenericError: ${aggregateError.message}`,
          { error: aggregateError.OriginalError }
        );

        throw new GetBookingDateTimeStatsGenericError();
      default:
        this.logger.error(
          `GetBookingDateTimeStatsGenericError: ${error.constructor.name}: ${error.message}`,
          { error: aggregateError.OriginalError }
        );
        throw new GetBookingDateTimeStatsGenericError();
    }
  }
}

export { GetBookingDateTimeStatsOperation };
