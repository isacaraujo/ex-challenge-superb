import { IProvider } from '../../../Core/Provider/IProvider';
import { IContainerService } from '../../../Core/Container/IContainerService';
import { IRestaurantWorkingDayLoader } from '../Service/IRestaurantWorkingDayLoader';
import { IRestaurantWorkingDayRepository } from '../Repository/IRestaurantWorkingDayRepository';
import { RestaurantWorkingDayLoader } from '../Service/RestaurantWorkingDayLoader';

class RestaurantServiceProvider implements IProvider {
  public constructor(
    private readonly container: IContainerService
  ) {}

  public register(): void {
    this.registerRestaurantWorkingDayLoader();
  }

  private registerRestaurantWorkingDayLoader(): void {
    this.container.register(
      IRestaurantWorkingDayLoader,
      async () => {
        const repository = await this.container
          .get<IRestaurantWorkingDayRepository>(IRestaurantWorkingDayRepository);
        
        return new RestaurantWorkingDayLoader(repository);
      });
  }
}

export { RestaurantServiceProvider };
