import { Restaurant } from '../../Restaurant/Entity/Restaurant';
import { BookingStats } from '../Entity/BookingStats';

interface IBookingStatsRepository {
  consolidateByDateAndTime(restaurant: Restaurant, date: string, time: number): Promise<BookingStats>;

  consolidateByDate(date: string): Promise<BookingStats[]>;
}

const IBookingStatsRepository = Symbol.for('IBookingStatsRepository');

export { IBookingStatsRepository };
