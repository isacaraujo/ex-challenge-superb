import { WorkingDay } from '../Entity/WorkingDay';

interface IRestaurantWorkingDayLoader {
  obtain(): Promise<WorkingDay[]>;
}

const IRestaurantWorkingDayLoader = Symbol.for('IRestaurantWorkingDayLoader');

export { IRestaurantWorkingDayLoader };
