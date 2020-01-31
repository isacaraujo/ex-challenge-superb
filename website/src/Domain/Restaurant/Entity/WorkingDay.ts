import { DayOfWeek } from '../Type/Enum/DayOfWeek';

class WorkingDay {
  public constructor(
    private dayOfWeek: DayOfWeek,
    private availableTimes: string[]
  ) {}

  public get DayOfWeek(): DayOfWeek {
    return this.dayOfWeek;
  }

  public set DayOfWeek(day: DayOfWeek) {
    this.dayOfWeek = day;
  }

  public get AvailableTimes(): string[] {
    return this.availableTimes;
  }

  public set AvailableTimes(times: string[]) {
    this.availableTimes = times;
  }
}

export { WorkingDay };
