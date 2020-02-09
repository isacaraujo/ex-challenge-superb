import {
    NextPendingBookingNotifyCommand
} from '../Type/Command/Service/NextPendingBookingNotifyCommand';

interface INextPendingBookingNotifierService {
  notify(command: NextPendingBookingNotifyCommand): Promise<void>;
}

const INextPendingBookingNotifierService = Symbol.for('INextPendingBookingNotifierService');

export { INextPendingBookingNotifierService };
