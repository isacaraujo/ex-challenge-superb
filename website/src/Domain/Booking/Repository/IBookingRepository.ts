import { Booking } from '../Entity/Booking';
import { Moment } from 'moment';
import { BookingAvailability } from '../Entity/BookingAvailability';
import { CreateBookingCommand } from '../Type/Command/CreateBookingCommand';
import { UpdateBookingCommand } from '../Type/Command/UpdateBookingCommand';
import { UpdateTimeBookingCommand } from '../Type/Command/UpdateTimeBookingCommand';


interface IBookingRepository {
  create(command: CreateBookingCommand): Promise<Booking>;

  findAllByDate(date: Moment): Promise<Booking[]>;

  findById(bookingId: string): Promise<Booking>;

  update(command: UpdateBookingCommand): Promise<void>;

  updateTime(command: UpdateTimeBookingCommand): Promise<void>;

  getAvailabilityByDate(date: Moment): Promise<BookingAvailability[]>;
}

const IBookingRepository = Symbol.for('IBookingRepository');

export { IBookingRepository };
