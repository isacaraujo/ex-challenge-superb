import { AggregateRecordError } from '../../../Core/Error/Repository/AggregateRecordError';
import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { Restaurant } from '../../Restaurant/Entity/Restaurant';
import { Booking } from '../Entity/Booking';
import { BookingStats } from '../Entity/BookingStats';
import { BookingOutOfTimeRangeError } from '../Error/Operation/BookingOutOfTimeRangeError';
import { CreateBookingGenericError } from '../Error/Operation/CreateBookingGenericError';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { CreateBookingCommand } from '../Type/Command/Operation/CreateBookingCommand';
import { ICreateBookingOperation } from './ICreateBookingOperation';

class CreateBookingOperation implements ICreateBookingOperation {
  public constructor(
    private readonly bookingRepository: IBookingRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(command: CreateBookingCommand): Promise<Booking> {
    const restaurant = command.Restaurant;
    const stats = command.Stats;

    let bookingTime = command.Time;

    if (restaurant.IsCloseInNextDay && bookingTime < restaurant.OpenTime) {
      bookingTime += Restaurant.DAY_IN_HOURS;
    }

    if (bookingTime < restaurant.OpenTime || bookingTime > restaurant.CloseTime - Booking.DURATION_IN_HOURS) {
      const lastScheduleTime = restaurant.RealCloseTime - Booking.DURATION_IN_HOURS;

      throw new BookingOutOfTimeRangeError(command.Time, restaurant.OpenTime, lastScheduleTime);
    }

    const booking = Booking.newBooking(
      command.Date,
      bookingTime,
      command.GuestName,
      command.GuestEmail,
      command.TotalGuests
    );

    const shouldConfirmBooking = this.shouldConfirmBooking(restaurant, stats);

    if (shouldConfirmBooking) {
      booking.confirm();
    }

    await this.saveBooking(booking);

    return booking;
  }

  private shouldConfirmBooking(restaurant: Restaurant, bookingStats: BookingStats): boolean {
    if (bookingStats.TotalScheduled > 0) {
      return false;
    }

    return bookingStats.TotalConfirmed < restaurant.TablesCount;
  }

  private async saveBooking(booking: Booking): Promise<void> {
    try {
      await this.bookingRepository.create(booking);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case SaveRecordError:
      case AggregateRecordError:
        const recordError = error as SaveRecordError;

        this.logger.error(
          `CreateBookingGenericError: ${recordError.message}`,
          { error: recordError.OriginalError }
        );

        throw new CreateBookingGenericError(error.message);
      default:
        this.logger.error(
          `CreateBookingGenericError: ${error.constructor.name}: ${error.message}`,
          { error }
        );

        throw new CreateBookingGenericError(error.message);
    }
  }
}

export { CreateBookingOperation };
