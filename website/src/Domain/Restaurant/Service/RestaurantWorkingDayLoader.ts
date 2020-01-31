import { IRestaurantWorkingDayRepository } from '../Repository/IRestaurantWorkingDayRepository';
import { WorkingDay } from '../Entity/WorkingDay';
import { IRestaurantWorkingDayLoader } from './IRestaurantWorkingDayLoader';

class RestaurantWorkingDayLoader implements IRestaurantWorkingDayLoader {
  public constructor(
    private readonly workingDayRepository: IRestaurantWorkingDayRepository
  ) {}

  public async obtain(): Promise<WorkingDay[]> {
    return this.workingDayRepository.findAll();
  }
}

export { RestaurantWorkingDayLoader }
