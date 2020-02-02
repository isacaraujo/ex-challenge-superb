class WorkingDay {
  private dayOfWeek: number;

  private openTime: number;

  private closeTime: number;

  public get DayOfWeek(): number {
    return this.dayOfWeek;
  }

  public set DayOfWeek(dayOfWeek: number) {
    this.dayOfWeek = dayOfWeek;
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
}

export { WorkingDay };
