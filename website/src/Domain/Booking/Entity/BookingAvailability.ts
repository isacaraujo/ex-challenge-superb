class BookingAvailability {
  public constructor(
    private readonly date: string,
    private readonly time: number,
    private readonly availableSlots: number
  ) {}

  public get Date(): string {
    return this.date;
  }

  public get Time(): number {
    return this.time;
  }

  public get AvailableSlots(): number {
    return this.availableSlots;
  }
}

export { BookingAvailability };
