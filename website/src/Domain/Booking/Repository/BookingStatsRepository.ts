import { BookingStats } from '../Entity/BookingStats';
import { IBookingStatsRepository } from './IBookingStatsRepository';

class BookingStatsRepository implements IBookingStatsRepository {
  public async findByDateAndTime(date: string, time: string): Promise<BookingStats> {
    const stats = new BookingStats(180, 10);

    console.log('Reservations for date', date, 'and time', time, stats);

    return Promise.resolve(stats);
  }
}

export { BookingStatsRepository };
