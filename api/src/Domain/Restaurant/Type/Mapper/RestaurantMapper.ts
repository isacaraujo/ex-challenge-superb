import { serialize } from 'cerialize';

import { Restaurant } from '../../Entity/Restaurant';

class RestaurantMapper {
  public constructor(private readonly restaurant: Restaurant) {}

  @serialize
  public get TablesCount(): number {
    return this.restaurant.TablesCount;
  }

  @serialize
  public get OpenTime(): number {
    return this.restaurant.OpenTime;
  }

  @serialize
  public get CloseTime(): number {
    return this.restaurant.RealCloseTime;
  }

  @serialize
  public get CloseInNextDay(): boolean {
    return this.restaurant.IsCloseInNextDay;
  }

  public static create(restaurant: Restaurant): RestaurantMapper {
    return new RestaurantMapper(restaurant);
  }
}

export { RestaurantMapper };
