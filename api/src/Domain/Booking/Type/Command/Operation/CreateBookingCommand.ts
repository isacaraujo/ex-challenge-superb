import { Restaurant } from '../../../../Restaurant/Entity/Restaurant';

class CreateBookingCommand {
  public constructor(
    private readonly restaurant: Restaurant,
    private readonly date: string,
    private readonly time: number,
    private readonly guestName: string,
    private readonly guestEmail: string,
    private readonly totalGuests: number
  ) {}

  public get Restaurant(): Restaurant {
    return this.restaurant;
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

  public static create(restaurant: Restaurant, data: any): CreateBookingCommand {
    return new CreateBookingCommand(
      restaurant,
      data.date,
      data.time,
      data.guestName,
      data.guestEmail,
      data.totalGuests,
    );
  }
}

export { CreateBookingCommand };
