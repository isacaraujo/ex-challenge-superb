import { IRestaurantModel } from '../Model/IRestaurantModel';
import { Restaurant } from '../../Entity/Restaurant';
import { WorkingDay } from '../../Entity/WorkingDay';

class RestaurantRecordFactory {
  public static createRecord(restaurant: Restaurant): any {
    return {
      tablesCount: restaurant.TablesCount,
      workingDays: restaurant.WorkingDays.map(w => ({
        dayOfWeek: w.DayOfWeek,
        openTime: w.OpenTime,
        closeTime: w.CloseTime,
      })),
    };
  }

  public static createFromRecord(record: IRestaurantModel): Restaurant {
    const restaurant = new Restaurant();
    restaurant.Id = record.id;
    restaurant.TablesCount = record.tablesCount;

    restaurant.WorkingDays = record.workingDays.map(w => {
      const workingDay = new WorkingDay();
      workingDay.DayOfWeek = w.dayOfWeek;
      workingDay.OpenTime = w.openTime;
      workingDay.CloseTime = w.closeTime;

      return workingDay;
    });

    return restaurant;
  }
}

export { RestaurantRecordFactory };
