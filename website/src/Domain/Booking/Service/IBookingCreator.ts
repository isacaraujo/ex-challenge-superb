import { ICreateBookingCommand } from '../Type/Command/ICreateBookingCommand';

interface IBookingCreator {
  create(command: ICreateBookingCommand): void;
}

const IBookingCreator = Symbol.for('IBookingCreator');

export { IBookingCreator };
