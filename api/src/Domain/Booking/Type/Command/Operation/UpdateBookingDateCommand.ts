import { Booking } from '../../../Entity/Booking';
import { Restaurant } from '../../../../Restaurant/Entity/Restaurant';

class UpdateBookingDateCommand {
  public constructor(
    private readonly booking: Booking,
    private readonly restaurant: Restaurant,
    private readonly date: string,
    private readonly time: number
  ) {}

  public get Booking(): Booking {
    return this.booking;
  }

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get Date(): string {
    return this.date;
  }

  public get Time(): number {
    return this.time;
  }

  public static create(booking: Booking, restaurant: Restaurant, data: any): UpdateBookingDateCommand {
    return new UpdateBookingDateCommand(booking, restaurant, data.date, data.time);
  }
}

export { UpdateBookingDateCommand };
