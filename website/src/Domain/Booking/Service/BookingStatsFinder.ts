import { BookingStats } from '../Entity/BookingStats';
import { IBookingStatsRepository } from '../Repository/IBookingStatsRepository';
import { IGetBookingStatsQuery } from '../Type/Query/IGetBookingStatsQuery';
import { IBookingStatsFinder } from './IBookingStatsFinder';

class BookingStatsFinder implements IBookingStatsFinder {
  public constructor(
    private readonly statsRepository: IBookingStatsRepository
  ) {}

  public async query(query: IGetBookingStatsQuery): Promise<BookingStats> {
    return this.statsRepository.findByDateAndTime(query.date, query.time);
  }
}

export { BookingStatsFinder };
