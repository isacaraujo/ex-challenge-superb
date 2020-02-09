import { Restaurant } from '../../Restaurant/Entity/Restaurant';
import { BookingStatus } from './BookingStatus';
import { Guest } from './Guest';

class Booking {
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

  private restaurantId: string;

  private reservationDate: Date;

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

  public get RestaurantId(): string {
    return this.restaurantId;
  }

  public set RestaurantId(restaurantId: string) {
    this.restaurantId = restaurantId;
  }

  public get ReservationDate(): Date {
    return this.reservationDate;
  }

  public set ReservationDate(reservationDate: Date) {
    this.reservationDate = reservationDate;
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

  public updateDateTime(date: string, time: number, reservationDate: Date): void {
    this.date = date;
    this.time = time;
    this.reservationDate = reservationDate;
    this.updatedAt = new Date();
  }

  public static newBooking(
    date: string,
    time: number,
    guestName: string,
    guestEmail: string,
    totalGuests: number,
    restaurantId: string,
    reservationDate: Date
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
    booking.RestaurantId = restaurantId;
    booking.ReservationDate = reservationDate;

    return booking;
  }
}

export { Booking };
