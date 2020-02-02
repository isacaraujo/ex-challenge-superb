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
}

export { BookingStats };
