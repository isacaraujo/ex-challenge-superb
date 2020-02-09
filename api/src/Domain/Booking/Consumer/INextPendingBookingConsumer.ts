import { IConsumerQueueReceiver } from '../../../Core/Queue/Consumer/IConsumerQueueReceiver';

interface INextPendingBookingConsumer extends IConsumerQueueReceiver {}

const INextPendingBookingConsumer = Symbol.for('INextPendingBookingConsumer');

export { INextPendingBookingConsumer };
