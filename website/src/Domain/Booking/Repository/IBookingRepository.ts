import { Booking } from '../Entity/Booking';

interface IBookingRepository {
  create(booking: Booking): Promise<void>;
}

const IBookingRepository = Symbol.for('IBookingRepository');

export { IBookingRepository };
