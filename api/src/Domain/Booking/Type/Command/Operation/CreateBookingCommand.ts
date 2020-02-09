import { Restaurant } from '../../../../Restaurant/Entity/Restaurant';
import { BookingStats } from '../../../Entity/BookingStats';

class CreateBookingCommand {
  public constructor(
    private readonly restaurant: Restaurant,
    private readonly stats: BookingStats,
    private readonly date: string,
    private readonly time: number,
    private readonly guestName: string,
    private readonly guestEmail: string,
    private readonly totalGuests: number
  ) {}

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

  public get GuestName(): string {
    return this.guestName;
  }

  public get GuestEmail(): string {
    return this.guestEmail;
  }

  public get TotalGuests(): number {
    return this.totalGuests;
  }

  public static create(
    restaurant: Restaurant,
    stats: BookingStats,
    data: any
  ): CreateBookingCommand {
    return new CreateBookingCommand(
      restaurant,
      stats,
      data.date,
      data.time,
      data.guestName,
      data.guestEmail,
      data.totalGuests,
    );
  }
}

export { CreateBookingCommand };
