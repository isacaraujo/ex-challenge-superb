import { ConfirmBookingCommand } from '../Type/Command/Operation/ConfirmBookingCommand';

interface IConfirmBookingOperation {
  execute(command: ConfirmBookingCommand): Promise<void>;
}

const IConfirmBookingOperation = Symbol.for('IConfirmBookingOperation');

export { IConfirmBookingOperation };
