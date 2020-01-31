import { IBookingRepository } from './IBookingRepository';
import { Booking } from '../Entity/Booking';
import { BookingStatus } from '../Type/Enum/BookingStatus';

class BookingRepository implements IBookingRepository {
  public async create(booking: Booking): Promise<void> {
    console.log('Booking created: ', booking);

    booking.UpdateGuidStatus('abc123', BookingStatus.RESERVED);

    return Promise.resolve();
  }
}

export { BookingRepository };
