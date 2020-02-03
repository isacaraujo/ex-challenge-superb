import { Booking } from '../Entity/Booking';

interface ICancelBookingOperation {
  execute(booking: Booking): Promise<void>;
}

const ICancelBookingOperation = Symbol.for('ICancelBookingOperation');

export { ICancelBookingOperation };
