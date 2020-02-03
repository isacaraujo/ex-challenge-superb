import { Restaurant } from '../../../Restaurant/Entity/Restaurant';

class GetBookingStatsQuery {
  public constructor(
    private readonly restaurant: Restaurant,
    private readonly date: string
  ) {}

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get Date(): string {
    return this.date;
  }

  public static create(restaurant: Restaurant, data: any): GetBookingStatsQuery {
    return new GetBookingStatsQuery(restaurant, data.date);
  }
}

export { GetBookingStatsQuery };
