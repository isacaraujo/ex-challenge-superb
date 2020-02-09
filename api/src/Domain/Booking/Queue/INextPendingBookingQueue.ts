import { IQueue } from '../../../Core/Queue/IQueue';

interface INextPendingBookingQueue extends IQueue {}

const INextPendingBookingQueue = Symbol.for('INextPendingBookingQueue');

export { INextPendingBookingQueue };
