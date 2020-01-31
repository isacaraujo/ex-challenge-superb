import { WorkingDay } from '../Entity/WorkingDay';

interface IRestaurantWorkingDayRepository {
  findAll(): Promise<WorkingDay[]>;
}

const IRestaurantWorkingDayRepository = Symbol.for('IRestaurantWorkingDayRepository');

export { IRestaurantWorkingDayRepository };
