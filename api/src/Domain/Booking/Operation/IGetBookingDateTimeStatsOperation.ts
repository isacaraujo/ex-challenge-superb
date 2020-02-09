import { BookingStats } from '../Entity/BookingStats';
import { Restaurant } from '../../Restaurant/Entity/Restaurant';

interface IGetBookingDateTimeStatsOperation {
  execute(restaurant: Restaurant, date: string, time: number): Promise<BookingStats>;
}

const IGetBookingDateTimeStatsOperation = Symbol.for('IGetBookingDateTimeStatsOperation');

export { IGetBookingDateTimeStatsOperation };
