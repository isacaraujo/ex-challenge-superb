import { Booking } from '../../Entity/Booking';

class UpdateBookingCommand {
  public constructor(
    private readonly booking: Booking,
    private readonly guestName: string,
    private readonly guestEmail: string,
    private readonly totalGuests: number
  ) {}

  public get Booking(): Booking {
    return this.booking;
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
    booking: Booking,
    name: string,
    email: string,
    totalGuests: string
  ) {
    return new UpdateBookingCommand(
      booking,
      name,
      email,
      parseInt(totalGuests)
    );
  }
}

export { UpdateBookingCommand };
