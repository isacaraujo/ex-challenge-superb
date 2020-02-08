import { Restaurant } from '../../Entity/Restaurant';
import { IRestaurantResponseType } from '../ResponseType/IRestaurantResponseType';

class RestaurantRecordFactory {
  public static createFromRecord(record: IRestaurantResponseType): Restaurant {
    const restaurant = new Restaurant();
    restaurant.TablesCount = record.tablesCount;
    restaurant.OpenTime = record.openTime;
    restaurant.CloseTime = record.closeTime;

    return restaurant;
  }
}

export { RestaurantRecordFactory };
