class BookingStats {
  public constructor(
    private totalTables: number,
    private availableTables: number
  ) {}

  public get TotalTables(): number {
    return this.totalTables;
  }

  public get AvailableTables(): number {
    return this.availableTables;
  }
}

export { BookingStats };
