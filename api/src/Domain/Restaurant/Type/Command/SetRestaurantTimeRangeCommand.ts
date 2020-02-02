import { Restaurant } from '../../Entity/Restaurant';
import { IRestaurantWorkdayCommand } from './IRestaurantWorkdayCommand';

class SetRestaurantTimeRangeCommand {
  public constructor(
    private readonly restaurant: Restaurant,
    private readonly workdays: IRestaurantWorkdayCommand[]
  ) {}

  public get Restaurant(): Restaurant {
    return this.restaurant;
  }

  public get Workdays(): IRestaurantWorkdayCommand[] {
    return this.workdays;
  }

  public static create(restaurant: Restaurant, workdays: IRestaurantWorkdayCommand[]): SetRestaurantTimeRangeCommand {
    return new SetRestaurantTimeRangeCommand(restaurant, workdays);
  }
}

export { SetRestaurantTimeRangeCommand };
