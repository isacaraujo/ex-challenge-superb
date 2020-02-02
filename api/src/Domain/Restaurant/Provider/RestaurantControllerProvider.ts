import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import { AddRestaurantTableController } from '../Controller/AddRestaurantTableController';
import { IAddRestaurantTableController } from '../Controller/IAddRestaurantTableController';
import { IAddRestaurantTableOperation } from '../Operation/IAddRestaurantTableOperation';
import { IFindCurrentRestaurantOperation } from '../Operation/IFindCurrentRestaurantOperation';

class RestaurantControllerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerAddRestaurantTableController();
  }

  private registerAddRestaurantTableController(): void {
    this.container.register(
      IAddRestaurantTableController,
      async () => {
        const findCurrentRestaurant = await this.container
          .get<IFindCurrentRestaurantOperation>(IFindCurrentRestaurantOperation);

        const addRestaurantTable = await this.container
          .get<IAddRestaurantTableOperation>(IAddRestaurantTableOperation);

        return new AddRestaurantTableController(findCurrentRestaurant, addRestaurantTable);
      }
    )
  }
}

export { RestaurantControllerProvider };
