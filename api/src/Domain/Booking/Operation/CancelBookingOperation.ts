import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { Booking } from '../Entity/Booking';
import { CancelBookingGenericError } from '../Error/Operation/CancelBookingGenericError';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { INextPendingBookingNotifierService } from '../Service/INextPendingBookingNotifierService';
import {
    NextPendingBookingNotifyCommand
} from '../Type/Command/Service/NextPendingBookingNotifyCommand';
import { ICancelBookingOperation } from './ICancelBookingOperation';

class CancelBookingOperation implements ICancelBookingOperation {
  public constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly pendingBookingNotifier: INextPendingBookingNotifierService,
    private readonly logger: ILogger
  ) {}

  public async execute(booking: Booking): Promise<void> {
    try {
      booking.cancel();

      await this.bookingRepository.update(booking);

      const notification = NextPendingBookingNotifyCommand.create(
        booking.Date,
        booking.Time
      );

      void this.pendingBookingNotifier.notify(notification);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case SaveRecordError:
        const recordError = error as SaveRecordError;

        this.logger.error(
          `CancelBookingGenericError: ${recordError.message}`,
          { error: recordError.OriginalError }
        );

        throw new CancelBookingGenericError();
      default:
        this.logger.error(
          `CancelBookingGenericError: ${error.constructor.name}: ${error.message}`,
          { error }
        );

        throw new CancelBookingGenericError();
    }
  }
}

export { CancelBookingOperation };
