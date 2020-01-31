import { IRestaurantWorkingDayRepository } from './IRestaurantWorkingDayRepository';
import { WorkingDay } from '../Entity/WorkingDay';
import { DayOfWeek } from '../Type/Enum/DayOfWeek';

const weekDayTimes = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const weekendTimes = [
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
]

const workingDays = [
  new WorkingDay(DayOfWeek.SUNDAY, weekendTimes),
  new WorkingDay(DayOfWeek.MONDAY, weekDayTimes),
  new WorkingDay(DayOfWeek.TUESDAY, weekDayTimes),
  new WorkingDay(DayOfWeek.WEDNESDAY, weekDayTimes),
  new WorkingDay(DayOfWeek.THURSDAY, weekDayTimes),
  new WorkingDay(DayOfWeek.FRIDAY, weekDayTimes),
  new WorkingDay(DayOfWeek.SATURDAY, weekendTimes),
];

class RestaurantWorkingDayRepository implements IRestaurantWorkingDayRepository {
  public async findAll(): Promise<WorkingDay[]> {
    return Promise.resolve(workingDays);
  }
}

export { RestaurantWorkingDayRepository };
