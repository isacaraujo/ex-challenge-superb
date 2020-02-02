import { Booking } from '../Entity/Booking';

interface IGetBookingOperation {
  execute(id: string): Promise<Booking>;
}

const IGetBookingOperation = Symbol.for('IGetBookingOperation');

export { IGetBookingOperation };
