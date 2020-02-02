import { Booking } from '../Entity/Booking';

interface IBookingRepository {
  create(booking: Booking): Promise<void>;
  findAllBookingsByDate(date: string): Promise<Booking[]>;
  findOneById(id: string): Promise<Booking>;
}

const IBookingRepository = Symbol.for('IBookingRepository');

export { IBookingRepository };
