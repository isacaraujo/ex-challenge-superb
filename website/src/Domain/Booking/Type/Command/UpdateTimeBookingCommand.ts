import { Moment } from 'moment';

import { Booking } from '../../Entity/Booking';

class UpdateTimeBookingCommand {
  public constructor(
    private readonly booking: Booking,
    private readonly date: Moment,
    private readonly time: number
  ) {}

  public get Booking(): Booking {
    return this.booking;
  }

  public get Date(): Moment {
    return this.date;
  }

  public get Time(): number {
    return this.time;
  }

  public static create(
    booking: Booking,
    date: Moment,
    time: string
  ) {
    return new UpdateTimeBookingCommand(
      booking,
      date,
      parseInt(time)
    );
  }
}

export { UpdateTimeBookingCommand };
