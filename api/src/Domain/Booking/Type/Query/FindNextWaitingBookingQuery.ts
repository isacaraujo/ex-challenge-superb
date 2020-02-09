import { Restaurant } from '../../../Restaurant/Entity/Restaurant';

class FindNextWaitingBookingQuery {
  public constructor(
    private restaurant: Restaurant,
    private date: string,
    private time: number
  ) {}

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get Date(): string {
    return this.date;
  }

  public get Time(): number {
    return this.time;
  }

  public static create(restaurant: Restaurant, date: string, time: number): FindNextWaitingBookingQuery {
    return new FindNextWaitingBookingQuery(restaurant, date, time);
  }
}

export { FindNextWaitingBookingQuery };
