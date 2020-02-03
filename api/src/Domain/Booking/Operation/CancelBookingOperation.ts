import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { Booking } from '../Entity/Booking';
import { CancelBookingGenericError } from '../Error/Operation/CancelBookingGenericError';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { ICancelBookingOperation } from './ICancelBookingOperation';

class CancelBookingOperation implements ICancelBookingOperation {
  public constructor(
    private readonly repository: IBookingRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(booking: Booking): Promise<void> {
    try {
      booking.cancel();

      await this.repository.update(booking);
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
