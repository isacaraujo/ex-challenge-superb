class NextPendingBookingNotifyCommand {
  public constructor(
    private readonly date: string,
    private readonly time: number
  ) {}

  public get Date(): string {
    return this.date;
  }

  public get Time(): number {
    return this.time;
  }

  public static create(
    date: string,
    time: number
  ): NextPendingBookingNotifyCommand {
    return new NextPendingBookingNotifyCommand(date, time);
  }
}

export { NextPendingBookingNotifyCommand };
