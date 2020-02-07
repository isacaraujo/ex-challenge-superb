import moment, { Moment } from 'moment';
import * as _ from 'lodash';

import { BookingStatus } from '../Type/Enum/BookingStatus';
import { Guest } from './Guest';

class Booking {
  private id?: string;

  private status?: BookingStatus;

  private guest?: Guest;

  private totalGuests?: number;

  private date?: string;

  private time?: number;

  public get Id(): string | undefined {
    return this.id;
  }

  public set Id(id: string | undefined) {
    this.id = id;
  }

  public get Status(): BookingStatus | undefined {
    return this.status;
  }

  public set Status(status: BookingStatus | undefined) {
    this.status = status;
  }

  public get Guest(): Guest | undefined {
    return this.guest;
  }

  public set Guest(guest: Guest | undefined) {
    this.guest = guest;
  }

  public get TotalGuests(): number | undefined {
    return this.totalGuests;
  }

  public set TotalGuests(totalGuests: number | undefined) {
    this.totalGuests = totalGuests;
  }

  public get Date(): string | undefined {
    return this.date;
  }

  public set Date(date: string | undefined) {
    this.date = date;
  }

  public get Time(): number | undefined {
    return this.time;
  }

  public set Time(time: number | undefined) {
    this.time = time;
  }

  public get IsScheduled(): boolean {
    return this.status === BookingStatus.SCHEDULED;
  }

  public get ReservationDate(): Moment {
    const formatHour = _.padStart(String(this.time), 2, '0');
    return moment(`${this.date} ${formatHour}`, 'YYYY-MM-DD HH');
  }
}

export { Booking };
