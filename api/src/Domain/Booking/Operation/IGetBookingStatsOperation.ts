import { BookingStats } from '../Entity/BookingStats';
import { GetBookingStatsQuery } from '../Type/Query/GetBookingStatsQuery';

interface IGetBookingStatsOperation {
  execute(query: GetBookingStatsQuery): Promise<BookingStats[]>;
}

const IGetBookingStatsOperation = Symbol.for('IGetBookingStatsOperation');

export { IGetBookingStatsOperation };
