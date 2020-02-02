import { Booking } from '../Entity/Booking';
import { ListBookingQuery } from '../Type/Query/ListBookingQuery';

interface IListBookingOperation {
  execute(query: ListBookingQuery): Promise<Booking[]>;
}

const IListBookingOperation = Symbol.for('IListBookingOperation');

export { IListBookingOperation };
