import { BookingStatus } from '../Type/Enum/BookingStatus';
import { Guest } from './Guest';

class Booking {
  private guid?: string;

  private status?: BookingStatus;

  public constructor(
    private guest: Guest,
    private totalGuests: number,
    private date: string,
    private time: string
  ) {}

  public get Guid(): string | undefined {
    return this.guid;
  }

  public get Status(): BookingStatus | undefined {
    return this.status;
  }

  public get Guest(): Guest {
    return this.guest;
  }

  public get TotalGuests(): number {
    return this.totalGuests;
  }

  public get Date(): string {
    return this.date;
  }

  public get Time(): string {
    return this.time;
  }

  public UpdateGuidStatus(guid: string, status: BookingStatus): void {
    this.guid = guid;
    this.status = status;
  }

  public IsBooked(): boolean {
    return this.guid !== undefined;
  }
}

export { Booking };
