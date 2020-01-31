import { IProvider } from '../../../Core/Provider/IProvider';
import { IContainerService } from '../../../Core/Container/IContainerService';
import { IRestaurantWorkingDayRepository } from '../Repository/IRestaurantWorkingDayRepository';
import { RestaurantWorkingDayRepository } from '../Repository/RestaurantWorkingDayRepository';

class RestaurantRepositoryProvider implements IProvider {
  public constructor(
    private readonly container: IContainerService
  ) {}

  public register(): void {
    this.registerLoadSettingsRepository();
  }

  private registerLoadSettingsRepository(): void {
    this.container.register(
      IRestaurantWorkingDayRepository,
      async () => {
        return new RestaurantWorkingDayRepository();
      })
  }
}

export { RestaurantRepositoryProvider };
