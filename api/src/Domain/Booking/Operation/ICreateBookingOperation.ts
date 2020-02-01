import { Booking } from '../Entity/Booking';
import { CreateBookingCommand } from '../Type/Command/Operation/CreateBookingCommand';

interface ICreateBookingOperation {
  execute(command: CreateBookingCommand): Promise<Booking>;
}

const ICreateBookingOperation = Symbol.for('ICreateBookingOperation');

export { ICreateBookingOperation };
