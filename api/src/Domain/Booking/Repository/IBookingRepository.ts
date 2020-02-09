import { Booking } from '../Entity/Booking';
import { Restaurant } from '../../Restaurant/Entity/Restaurant';

interface IBookingRepository {
  create(booking: Booking): Promise<void>;
  update(booking: Booking): Promise<void>;
  findAllBookingsByDate(date: string): Promise<Booking[]>;
  findOneById(id: string): Promise<Booking>;
  findNextPending(restaurant: Restaurant, date: string, time: number): Promise<Booking>;
}

const IBookingRepository = Symbol.for('IBookingRepository');

export { IBookingRepository };
