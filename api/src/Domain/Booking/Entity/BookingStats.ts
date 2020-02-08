import { Restaurant } from '../../Restaurant/Entity/Restaurant';

class BookingStats {
  private date: string;

  private time: number;

  private totalConfirmed: number;

  private totalScheduled: number;

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

  public get RealTime(): number {
    if (this.time >= Restaurant.DAY_IN_HOURS) {
      return this.time - Restaurant.DAY_IN_HOURS;
    }

    return this.time;
  }

  public get TotalConfirmed(): number {
    return this.totalConfirmed;
  }

  public set TotalConfirmed(totalConfirmed: number) {
    this.totalConfirmed = totalConfirmed;
  }

  public get TotalScheduled(): number {
    return this.totalScheduled;
  }

  public set TotalScheduled(totalScheduled: number) {
    this.totalScheduled = totalScheduled;
  }

  public static createEmpty(date: string, time: number): BookingStats {
    const stats = new BookingStats();
    stats.Date = date;
    stats.Time = time;
    stats.TotalConfirmed = 0;
    stats.TotalScheduled = 0;

    return stats;
  }
}

export { BookingStats };
