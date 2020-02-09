import { Restaurant } from '../../../../Restaurant/Entity/Restaurant';
import { BookingStats } from '../../../Entity/BookingStats';
import { Booking } from '../../../Entity/Booking';

class ConfirmBookingCommand {
  public constructor(
    private readonly restaurant: Restaurant,
    private readonly stats: BookingStats,
    private readonly booking: Booking
  ) {}

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get Stats(): BookingStats {
    return this.stats;
  }

  public get Booking(): Booking {
    return this.booking;
  }

  public static create(
    restaurant: Restaurant,
    stats: BookingStats,
    booking: Booking
  ): ConfirmBookingCommand {
    return new ConfirmBookingCommand(restaurant, stats, booking);
  }
}

export { ConfirmBookingCommand };
