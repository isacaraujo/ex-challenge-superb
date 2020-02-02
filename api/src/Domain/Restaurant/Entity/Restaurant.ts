class Restaurant {
  public static readonly DAY_IN_HOURS = 24;

  private id: string;

  private tablesCount: number;

  private openTime: number;

  private closeTime: number;

  public get Id(): string {
    return this.id;
  }

  public set Id(id: string) {
    this.id = id;
  }

  public get TablesCount(): number {
    return this.tablesCount;
  }

  public set TablesCount(tablesCount: number) {
    this.tablesCount = tablesCount;
  }

  public get OpenTime(): number {
    return this.openTime;
  }

  public set OpenTime(openTime: number) {
    this.openTime = openTime;
  }

  public get CloseTime(): number {
    return this.closeTime;
  }

  public set CloseTime(closeTime: number) {
    this.closeTime = closeTime;
  }

  public get RealCloseTime(): number {
    if (this.closeTime >= Restaurant.DAY_IN_HOURS) {
      return this.closeTime - Restaurant.DAY_IN_HOURS;
    }

    return this.closeTime;
  }

  public get IsCloseInNextDay(): boolean {
    return this.closeTime >= Restaurant.DAY_IN_HOURS;
  }

  public incrementTable(): void {
    this.tablesCount += 1;
  }

  public setTimeRange(openTime: number, closeTime: number): void {
    this.openTime = openTime;

    let closeTimeIndex = closeTime;

    if (closeTime < openTime) {
      closeTimeIndex = Restaurant.DAY_IN_HOURS + closeTime;
    }

    this.closeTime = closeTimeIndex;
  }
}

export { Restaurant };
