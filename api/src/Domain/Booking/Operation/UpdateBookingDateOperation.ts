import * as moment from 'moment';

import { IUpdateBookingDateOperation } from './IUpdateBookingDateOperation';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { UpdateBookingDateCommand } from '../Type/Command/Operation/UpdateBookingDateCommand';
import { Restaurant } from '../../Restaurant/Entity/Restaurant';
import { BookingOutOfTimeRangeError } from '../Error/Operation/BookingOutOfTimeRangeError';
import { BookingNoTablesLeftError } from '../Error/Operation/BookingNoTablesLeftError';
import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
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
    const time = command.Time;
    const stats = command.Stats;

    this.validateTimeRange(restaurant, time);

    const reservationDate = this.createReservationDate(restaurant, date, time);

    booking.updateDateTime(date, time, reservationDate);

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

  private validateTimeRange(restaurant: Restaurant, bookingTime: number): void {
    const slots = restaurant.TimeSlots;

    if (slots.indexOf(bookingTime) === -1) {
      throw new BookingOutOfTimeRangeError(bookingTime, restaurant.OpenTime, restaurant.CloseTime);
    }
  }

  private createReservationDate(restaurant: Restaurant, date: string, time: number): Date {
    const reservationDate = moment(date);

    reservationDate.hour(time);

    if (time < restaurant.OpenTime) {
      reservationDate.add(1, 'day');
    }

    return reservationDate.toDate();
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
