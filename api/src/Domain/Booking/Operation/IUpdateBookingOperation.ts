import { UpdateBookingCommand } from '../Type/Command/Operation/UpdateBookingCommand';

interface IUpdateBookingOperation {
  execute(command: UpdateBookingCommand): Promise<void>;
}

const IUpdateBookingOperation = Symbol.for('IUpdateBookingOperation');

export { IUpdateBookingOperation };
