import { Moment } from 'moment';

class CreateBookingCommand {
  public constructor(
    private readonly name: string,
    private readonly email: string,
    private readonly totalGuests: number,
    private readonly date: string,
    private readonly time: number
  ) {}

  public get Name(): string {
    return this.name;
  }

  public get Email(): string {
    return this.email;
  }

  public get TotalGuests(): number {
    return this.totalGuests;
  }

  public get Date(): string {
    return this.date;
  }

  public get Time(): number {
    return this.time;
  }

  public static create(
    name: string,
    email: string,
    totalGuests: string,
    date: Moment,
    time: string
  ): CreateBookingCommand {
    const formatDate = date.format('YYYY-MM-DD');

    return new CreateBookingCommand(
      name,
      email,
      parseInt(totalGuests),
      formatDate,
      parseInt(time)
    );
  }
}

export { CreateBookingCommand };
