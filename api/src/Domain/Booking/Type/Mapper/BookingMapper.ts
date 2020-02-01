import { serialize } from 'cerialize';

import { Booking } from '../../Entity/Booking';
import { BookingGuestMapper } from './BookingGuestMapper';

class BookingMapper {
  public constructor(private readonly booking: Booking) {}

  @serialize
  public get Id(): string {
    return this.booking.Id;
  }

  @serialize
  public get CreatedAt(): Date {
    return this.booking.CreatedAt;
  }

  @serialize
  public get UpdatedAt(): Date {
    return this.booking.UpdatedAt;
  }

  @serialize
  public get CanceledAt(): Date {
    return this.booking.CanceledAt;
  }

  @serialize
  public get ConfirmedAt(): Date {
    return this.booking.ConfirmatedAt;
  }

  @serialize
  public get Date(): string {
    return this.booking.Date;
  }

  @serialize
  public get Time(): string {
    return this.booking.Time;
  }

  @serialize
  public get Guest(): BookingGuestMapper {
    return new BookingGuestMapper(this.booking.Guest);
  }

  @serialize
  public get TotalGuests(): number {
    return this.booking.TotalGuests;
  }

  @serialize
  public get Status(): string {
    return this.booking.Status;
  }

  public static create(booking: Booking): BookingMapper {
    return new BookingMapper(booking);
  }
}

export { BookingMapper };
