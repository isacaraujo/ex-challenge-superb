import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { Restaurant } from '../../Restaurant/Entity/Restaurant';
import { BookingStats } from '../Entity/BookingStats';
import { BookingNoTablesLeftError } from '../Error/Operation/BookingNoTablesLeftError';
import { UpdateBookingGenericError } from '../Error/Operation/UpdateBookingGenericError';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { ConfirmBookingCommand } from '../Type/Command/Operation/ConfirmBookingCommand';
import { IConfirmBookingOperation } from './IConfirmBookingOperation';

class ConfirmBookingOperation implements IConfirmBookingOperation {
  public constructor(
    private readonly repository: IBookingRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(command: ConfirmBookingCommand): Promise<void> {
    this.validate(command.Restaurant, command.Stats);

    const booking = command.Booking;

    try {
      booking.confirm();

      await this.repository.update(booking);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private validate(restaurant: Restaurant,stats: BookingStats): void {
    if (stats.TotalConfirmed >= restaurant.TablesCount) {
      throw new BookingNoTablesLeftError();
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
        const message = `UpdateBookingGenericError: ${error.constructor.name}: ${error.message}`;

        this.logger.error(message, { error });

        throw new UpdateBookingGenericError();
    }
  }
}

export { ConfirmBookingOperation };
