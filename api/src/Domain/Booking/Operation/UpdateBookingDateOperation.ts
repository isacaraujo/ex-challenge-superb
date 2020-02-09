import { IUpdateBookingDateOperation } from './IUpdateBookingDateOperation';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { UpdateBookingDateCommand } from '../Type/Command/Operation/UpdateBookingDateCommand';
import { Restaurant } from '../../Restaurant/Entity/Restaurant';
import { Booking } from '../Entity/Booking';
import { BookingOutOfTimeRangeError } from '../Error/Operation/BookingOutOfTimeRangeError';
import { BookingNoTablesLeftError } from '../Error/Operation/BookingNoTablesLeftError';
import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { AggregateRecordError } from '../../../Core/Error/Repository/AggregateRecordError';
import { UpdateBookingGenericError } from '../Error/Operation/UpdateBookingGenericError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { BookingStats } from '../Entity/BookingStats';

class UpdateBookingDateOperation implements IUpdateBookingDateOperation {
  public constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(command: UpdateBookingDateCommand): Promise<void> {
    const booking = command.Booking;
    const restaurant = command.Restaurant;
    const date = command.Date;
    const stats = command.Stats;

    let bookingTime = command.Time;

    if (restaurant.IsCloseInNextDay && bookingTime < restaurant.OpenTime) {
      bookingTime += Restaurant.DAY_IN_HOURS;
    }

    if (bookingTime < restaurant.OpenTime || bookingTime > restaurant.CloseTime - Booking.DURATION_IN_HOURS) {
      const lastScheduleTime = restaurant.RealCloseTime - Booking.DURATION_IN_HOURS;

      throw new BookingOutOfTimeRangeError(command.Time, restaurant.OpenTime, lastScheduleTime);
    }

    booking.updateDateTime(date, bookingTime);

    const hasAvailableTables = this.hasAvailableTables(restaurant, stats);

    if (!hasAvailableTables) {
      throw new BookingNoTablesLeftError();
    }

    if (!booking.IsConfirmed) {
      booking.confirm();
    }

    try {
      await this.bookingRepository.update(booking);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private hasAvailableTables(restaurant: Restaurant, bookingStats: BookingStats): boolean {
    if (bookingStats.TotalScheduled > 0) {
      return false;
    }

    return bookingStats.TotalConfirmed < restaurant.TablesCount;
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case SaveRecordError:
      case AggregateRecordError:
        const recordError = error as SaveRecordError;

        this.logger.error(
          `UpdateBookingGenericError: ${recordError.message}`,
          { error: recordError.OriginalError }
        );

        throw new UpdateBookingGenericError();
      default:
        this.logger.error(
          `UpdateBookingGenericError: ${error.constructor.name}: ${error.message}`,
          { error }
        );

        throw new UpdateBookingGenericError();
    }
  }
}

export { UpdateBookingDateOperation };
