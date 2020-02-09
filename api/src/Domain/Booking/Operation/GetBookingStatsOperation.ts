import { AggregateRecordError } from '../../../Core/Error/Repository/AggregateRecordError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { Restaurant } from '../../Restaurant/Entity/Restaurant';
import { BookingStats } from '../Entity/BookingStats';
import { GetBookingStatsGenericError } from '../Error/Operation/GetBookingStatsGenericError';
import { IBookingStatsRepository } from '../Repository/IBookingStatsRepository';
import { GetBookingStatsQuery } from '../Type/Query/GetBookingStatsQuery';
import { IGetBookingStatsOperation } from './IGetBookingStatsOperation';

class GetBookingStatsOperation implements IGetBookingStatsOperation {
  public constructor(
    private readonly bookingStatsRepository: IBookingStatsRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(query: GetBookingStatsQuery): Promise<BookingStats[]> {
    const restaurant = query.Restaurant;
    const date = query.Date;

    try {
      const allStats = await this.bookingStatsRepository
        .consolidateByDate(restaurant, date);

      return this.generateBookingStatsTimeGrid(date, restaurant, allStats);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private generateBookingStatsTimeGrid(
    date: string,
    restaurant: Restaurant,
    allStats: BookingStats[]
  ): BookingStats[] {
    return restaurant.TimeSlots.map(time => {
      let selectedStats = allStats.find(stats => stats.Time === time);

      if (selectedStats === undefined) {
        selectedStats = BookingStats.createEmpty(date, time);
      }

      return selectedStats;
    });
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case AggregateRecordError:
        const aggregateError = error as AggregateRecordError;
        this.logger.error(
          `GetBookingStatsGenericError: ${aggregateError.message}`,
          { error: aggregateError.OriginalError }
        );

        throw new GetBookingStatsGenericError();
      default:
        this.logger.error(
          `GetBookingStatsGenericError: ${error.constructor.name}: ${error.message}`,
          { error: aggregateError.OriginalError }
        );
        throw new GetBookingStatsGenericError();
    }
  }
}

export { GetBookingStatsOperation };
