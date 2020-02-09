import { Restaurant } from '../../../../Restaurant/Entity/Restaurant';
import { Booking } from '../../../Entity/Booking';
import { BookingStats } from '../../../Entity/BookingStats';

class UpdateBookingDateCommand {
  public constructor(
    private readonly booking: Booking,
    private readonly restaurant: Restaurant,
    private readonly stats: BookingStats,
    private readonly date: string,
    private readonly time: number
  ) {}

  public get Booking(): Booking {
    return this.booking;
  }

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get Stats(): BookingStats {
    return this.stats;
  }

  public get Date(): string {
    return this.date;
  }

  public get Time(): number {
    return this.time;
  }

  public static create(
    booking: Booking,
    restaurant: Restaurant,
    stats: BookingStats,
    data: any
  ): UpdateBookingDateCommand {
    return new UpdateBookingDateCommand(
      booking,
      restaurant,
      stats,
      data.date,
      data.time
    );
  }
}

export { UpdateBookingDateCommand };
