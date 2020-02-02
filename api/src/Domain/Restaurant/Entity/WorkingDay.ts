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

  public static create(dayOfWeek: number, openTime: number, closeTime: number): WorkingDay {
    const day = new WorkingDay();
    day.DayOfWeek = dayOfWeek;
    day.OpenTime = openTime;
    day.CloseTime = closeTime;

    return day;
  }
}

export { WorkingDay };
