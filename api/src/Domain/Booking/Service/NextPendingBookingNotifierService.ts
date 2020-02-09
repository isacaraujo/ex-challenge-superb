import { NotifierGenericError } from '../Error/Service/NotifierGenericError';
import { INextPendingBookingQueue } from '../Queue/INextPendingBookingQueue';
import {
    NextPendingBookingNotifyCommand
} from '../Type/Command/Service/NextPendingBookingNotifyCommand';
import { INextPendingBookingNotifierService } from './INextPendingBookingNotifierService';

class NextPendingBookingNotifierService implements INextPendingBookingNotifierService {
  public constructor(
    private readonly queue: INextPendingBookingQueue
  ) {}

  public async notify(command: NextPendingBookingNotifyCommand): Promise<void> {
    try {
      await this.queue.publish({
        date: command.Date,
        time: command.Time
      });
    } catch (error) {
      throw new NotifierGenericError(error.message, error);
    }
  }
}

export { NextPendingBookingNotifierService };
