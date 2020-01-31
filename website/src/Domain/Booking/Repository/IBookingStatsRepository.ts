import { BookingStats } from '../Entity/BookingStats';

interface IBookingStatsRepository {
  findByDateAndTime(date: string, time: string): Promise<BookingStats>;
}

const IBookingStatsRepository = Symbol.for('IBookingStatsRepository');

export { IBookingStatsRepository };
