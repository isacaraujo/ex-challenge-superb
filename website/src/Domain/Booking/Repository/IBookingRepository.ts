import { Booking } from '../Entity/Booking';
import { Moment } from 'moment';
import { BookingAvailability } from '../Entity/BookingAvailability';
import { CreateBookingCommand } from '../Type/Command/CreateBookingCommand';

interface IBookingRepository {
  create(command: CreateBookingCommand): Promise<Booking>;
  getAvailabilityByDate(date: Moment): Promise<BookingAvailability[]>;
}

const IBookingRepository = Symbol.for('IBookingRepository');

export { IBookingRepository };
