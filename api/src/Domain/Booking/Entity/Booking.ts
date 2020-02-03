import * as moment from 'moment';

import { BookingStatus } from './BookingStatus';
import { Guest } from './Guest';
import { Restaurant } from '../../Restaurant/Entity/Restaurant';

class Booking {
  public static readonly DURATION_IN_HOURS = 1;

  private id: string;

  private createdAt: Date;

  private updatedAt: Date;

  private canceledAt: Date;

  private confirmatedAt: Date;

  private date: string;

  private time: number;

  private guest: Guest;

  private totalGuests: number;

  private status: BookingStatus;

  public get Id(): string {
    return this.id;
  }

  public set Id(id: string) {
    this.id = id;
  }

  public get CreatedAt(): Date {
    return this.createdAt;
  }

  public set CreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  public get UpdatedAt(): Date {
    return this.updatedAt;
  }

  public set UpdatedAt(updatedAt: Date) {
    this.updatedAt = updatedAt;
  }

  public get CanceledAt(): Date {
    return this.canceledAt;
  }

  public set CanceledAt(canceledAt: Date) {
    this.canceledAt = canceledAt;
  }

  public get ConfirmatedAt(): Date {
    return this.confirmatedAt;
  }

  public set ConfirmatedAt(confirmatedAt: Date) {
    this.confirmatedAt = confirmatedAt;
  }

  public get Date(): string {
    return this.date;
  }

  public set Date(date: string) {
    this.date = date;
  }

  public get Time(): number {
    return this.time;
  }

  public set Time(time: number) {
    this.time = time;
  }

  public get IsReservedToNextDay(): boolean {
    return this.time >= Restaurant.DAY_IN_HOURS;
  }

  public get RealTime(): number {
    if (this.IsReservedToNextDay) {
      return this.time - Restaurant.DAY_IN_HOURS;
    }

    return this.time;
  }

  public get ReservationDate(): Date {
    const reservationDate = moment(this.date);

    reservationDate.hour(this.RealTime);

    if (this.IsReservedToNextDay) {
      reservationDate.add(1, 'day');
    }

    return reservationDate.toDate();
  }

  public get Guest(): Guest {
    return this.guest;
  }

  public set Guest(guest: Guest) {
    this.guest = guest;
  }

  public get TotalGuests(): number {
    return this.totalGuests;
  }

  public set TotalGuests(totalGuests: number) {
    this.totalGuests = totalGuests;
  }

  public get Status(): BookingStatus {
    return this.status;
  }

  public set Status(status: BookingStatus) {
    this.status = status;
  }

  public get IsCanceled(): boolean {
    return this.status === BookingStatus.CANCELED;
  }

  public get IsConfirmed(): boolean {
    return this.status === BookingStatus.CONFIRMED;
  }

  public confirm(): void {
    const now = new Date();
    this.confirmatedAt = now;
    this.status = BookingStatus.CONFIRMED;
    this.updatedAt = now;
  }

  public cancel(): void {
    const now = new Date();
    this.canceledAt = now;
    this.status = BookingStatus.CANCELED;
    this.updatedAt = now;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public updateGuestInfo(guestName: string, guestEmail: string, totalGuests: number): void {
    this.guest.Name = guestName;
    this.guest.Email = guestEmail;
    this.totalGuests = totalGuests;
    this.updatedAt = new Date();
  }

  public updateDateTime(date: string, time: number): void {
    this.date = date;
    this.time = time;
    this.updatedAt = new Date();
  }

  public static newBooking(
    date: string,
    time: number,
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
