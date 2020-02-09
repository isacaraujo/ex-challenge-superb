import { Booking } from '../Entity/Booking';
import { FindNextWaitingBookingQuery }from '../Type/Query/FindNextWaitingBookingQuery';

interface IFindNextWaitingBookingOperation {
  execute(query: FindNextWaitingBookingQuery): Promise<Booking>;
}

const IFindNextWaitingBookingOperation = Symbol.for('IFindNextWaitingBookingOperation');

export { IFindNextWaitingBookingOperation };
