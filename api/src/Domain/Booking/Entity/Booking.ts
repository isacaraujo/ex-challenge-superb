import { BookingStatus } from './BookingStatus';
import { Guest } from './Guest';

class Booking {
  private id: string;

  private createdAt: Date;

  private updatedAt: Date;

  private canceledAt: Date;

  private confirmatedAt: Date;

  private date: string;

  private time: string;

  private guest: Guest;

  private totalGuests: number;

  private status: BookingStatus;

  public get Id(): string {
    return this.id;
  }

  public get CreatedAt(): Date {
    return this.createdAt;
  }

  public get UpdatedAt(): Date {
    return this.updatedAt;
  }

  public get CanceledAt(): Date {
    return this.canceledAt;
  }

  public get ConfirmatedAt(): Date {
    return this.confirmatedAt;
  }

  public get Date(): string {
    return this.date;
  }

  public get Time(): string {
    return this.time;
  }

  public get Guest(): Guest {
    return this.guest;
  }

  public get TotalGuests(): number {
    return this.totalGuests;
  }

  public get Status(): BookingStatus {
    return this.status;
  }

  public confirm(): void {
    this.confirmatedAt = new Date();
    this.status = BookingStatus.CONFIRMED;
  }

  public cancel(): void {
    this.canceledAt = new Date();
    this.status = BookingStatus.CANCELED;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public static newBooking(
    date: string,
    time: string,
    guestName: string,
    guestEmail: string,
    totalGuests: number
  ): Booking {
    const guest = new Guest(guestName, guestEmail);
    const booking = new Booking();
    const now = new Date();

    booking.date = date;
    booking.time = time;
    booking.guest = guest;
    booking.totalGuests = totalGuests;
    booking.createdAt = now;
    booking.updatedAt = now;
    booking.status = BookingStatus.SCHEDULED;

    return booking;
  }
}

export { Booking };
