class ListBookingQuery {
  public constructor(
    private readonly date: string
  ) {}

  public get Date(): string {
    return this.date;
  }

  public static create(data: any): ListBookingQuery {
    return new ListBookingQuery(data.date);
  }
}

export { ListBookingQuery };
