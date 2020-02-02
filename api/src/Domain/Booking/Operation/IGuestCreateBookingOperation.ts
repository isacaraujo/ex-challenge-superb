import { Booking } from '../Entity/Booking';
import { CreateBookingCommand } from '../Type/Command/Operation/CreateBookingCommand';

interface IGuestCreateBookingOperation {
  execute(command: CreateBookingCommand): Promise<Booking>;
}

const IGuestCreateBookingOperation = Symbol.for('IGuestCreateBookingOperation');

export { IGuestCreateBookingOperation };
