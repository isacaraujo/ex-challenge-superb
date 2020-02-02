import { serialize } from 'cerialize';

import { WorkingDay } from '../../Entity/WorkingDay';

class WorkingDayMapper {
  public constructor(private readonly workingDay: WorkingDay) {}

  @serialize
  public get DayOfWeek(): number {
    return this.workingDay.DayOfWeek;
  }

  public get OpenTime(): number {
    return this.workingDay.OpenTime;
  }

  public get CloseTime(): number {
    return this.workingDay.CloseTime;
  }
}

export { WorkingDayMapper };
