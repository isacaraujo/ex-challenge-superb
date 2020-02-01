class CreateBookingCommand {
  public constructor(
    private date: string,
    private time: string,
    private guestName: string,
    private guestEmail: string,
    private totalGuests: number
  ) {}

  public get Date(): string {
    return this.date;
  }

  public get Time(): string {
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

  public static factory(data: any): CreateBookingCommand {
    return new CreateBookingCommand(
      data.date,
      data.time,
      data.guestName,
      data.guestEmail,
      data.totalGuests,
    );
  }
}

export { CreateBookingCommand };
