import { BookingStats } from '../Entity/BookingStats';
import { IGetBookingStatsQuery } from '../Type/Query/IGetBookingStatsQuery';

interface IBookingStatsFinder {
  query(query: IGetBookingStatsQuery): Promise<BookingStats>;
}

const IBookingStatsFinder = Symbol.for('IBookingStatsFinder');

export { IBookingStatsFinder };
