import { Restaurant } from '../../Entity/Restaurant';

class SetRestaurantTimeRangeCommand {
  public constructor(
    private readonly restaurant: Restaurant,
    private readonly openTime: number,
    private readonly closeTime: number
  ) {}

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get OpenTime(): number {
    return this.openTime;
  }

  public get CloseTime(): number {
    return this.closeTime;
  }

  public static create(restaurant: Restaurant, openTime: number, closeTime: number): SetRestaurantTimeRangeCommand {
    return new SetRestaurantTimeRangeCommand(restaurant, openTime, closeTime);
  }
}

export { SetRestaurantTimeRangeCommand };
