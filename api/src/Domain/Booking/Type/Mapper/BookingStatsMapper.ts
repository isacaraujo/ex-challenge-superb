import { serialize } from 'cerialize';

import { Restaurant } from '../../../Restaurant/Entity/Restaurant';
import { BookingStats } from '../../Entity/BookingStats';

class BookingStatsMapper {
  public constructor(
    private readonly restaurant: Restaurant,
    private readonly stats: BookingStats
  ) {}

  @serialize
  public get Date(): string {
    return this.stats.Date;
  }

  @serialize
  public get Time(): number {
    return this.stats.RealTime;
  }

  @serialize
  public get AvailableSlots(): number {
    if (this.stats.TotalScheduled > 0) {
      return 0;
    }

    return this.restaurant.TablesCount - this.stats.TotalConfirmed;
  }

  public static createFromCollection(
    restaurant: Restaurant,
    allStats: BookingStats[]
  ): BookingStatsMapper[] {
    return allStats.map(stats => new BookingStatsMapper(restaurant, stats));
  }
}

export { BookingStatsMapper };
