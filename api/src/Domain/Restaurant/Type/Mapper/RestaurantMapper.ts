import { serialize } from 'cerialize';

import { Restaurant } from '../../Entity/Restaurant';
import { WorkingDayMapper } from './WorkingDayMapper';

class RestaurantMapper {
  public constructor(private readonly restaurant: Restaurant) {}

  @serialize
  public get TablesCount(): number {
    return this.restaurant.TablesCount;
  }

  @serialize
  public get WorkingDays(): WorkingDayMapper[] {
    return this.restaurant.WorkingDays
      .map(w => new WorkingDayMapper(w));
  }

  public static create(restaurant: Restaurant): RestaurantMapper {
    return new RestaurantMapper(restaurant);
  }
}

export { RestaurantMapper };
