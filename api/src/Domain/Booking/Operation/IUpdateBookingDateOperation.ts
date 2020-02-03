import { UpdateBookingDateCommand } from '../Type/Command/Operation/UpdateBookingDateCommand';

interface IUpdateBookingDateOperation {
  execute(command: UpdateBookingDateCommand): Promise<void>;
}

const IUpdateBookingDateOperation = Symbol.for('IUpdateBookingDateOperation');

export { IUpdateBookingDateOperation };
