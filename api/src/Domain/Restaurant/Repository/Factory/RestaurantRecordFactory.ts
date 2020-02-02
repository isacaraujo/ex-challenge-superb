import { IRestaurantModel } from '../Model/IRestaurantModel';
import { Restaurant } from '../../Entity/Restaurant';

class RestaurantRecordFactory {
  public static createRecord(restaurant: Restaurant): any {
    return {
      tablesCount: restaurant.TablesCount,
      openTime: restaurant.OpenTime,
      closeTime: restaurant.CloseTime,
    };
  }

  public static createFromRecord(record: IRestaurantModel): Restaurant {
    const restaurant = new Restaurant();
    restaurant.Id = record.id;
    restaurant.TablesCount = record.tablesCount;
    restaurant.OpenTime = record.openTime;
    restaurant.CloseTime = record.closeTime;

    return restaurant;
  }
}

export { RestaurantRecordFactory };
