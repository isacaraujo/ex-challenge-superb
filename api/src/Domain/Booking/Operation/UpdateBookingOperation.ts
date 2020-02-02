import { IUpdateBookingOperation } from './IUpdateBookingOperation';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { ILogger } from '../../../Core/Logger/ILogger';
import { UpdateBookingCommand } from '../Type/Command/Operation/UpdateBookingCommand';
import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { UpdateBookingGenericError } from '../Error/Operation/UpdateBookingGenericError';

class UpdateBookingOperation implements IUpdateBookingOperation {
  public constructor(
    private readonly repository: IBookingRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(command: UpdateBookingCommand): Promise<void> {
    const booking = command.Booking;

    try {
      booking.updateGuestInfo(command.GuestName, command.GuestEmail, command.TotalGuests);

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
          `UpdateBookingGenericError: ${recordError.message}`,
          { error: recordError.OriginalError }
        );

        throw new UpdateBookingGenericError();
      default:
        const message = `CreateBookingGenericError: ${error.constructor.name}: ${error.message}`;

        this.logger.error(message, { error });

        throw new UpdateBookingGenericError();
    }
  }
}

export { UpdateBookingOperation };
