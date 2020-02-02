import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import { AddRestaurantTableController } from '../Controller/AddRestaurantTableController';
import { GetRestaurantInfoController } from '../Controller/GetRestaurantInfoController';
import { IAddRestaurantTableController } from '../Controller/IAddRestaurantTableController';
import { IGetRestaurantInfoController } from '../Controller/IGetRestaurantInfoController';
import { ISetRestaurantTimeRangeController } from '../Controller/ISetRestaurantTimeRangeController';
import { SetRestaurantTimeRangeController } from '../Controller/SetRestaurantTimeRangeController';
import { IAddRestaurantTableOperation } from '../Operation/IAddRestaurantTableOperation';
import { IFindCurrentRestaurantOperation } from '../Operation/IFindCurrentRestaurantOperation';
import { ISetRestaurantTimeRangeOperation } from '../Operation/ISetRestaurantTimeRangeOperation';
import { ISetRestaurantTimeRangeValidation } from '../Validation/ISetRestaurantTimeRangeValidation';

class RestaurantControllerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerAddRestaurantTableController();
    this.registerSetRestaurantTimeRangeController();
    this.registerGetRestaurantInfoController();
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
      });
  }

  private registerSetRestaurantTimeRangeController(): void {
    this.container.register(
      ISetRestaurantTimeRangeController,
      async () => {
        const validation = await this.container
          .get<ISetRestaurantTimeRangeValidation>(ISetRestaurantTimeRangeValidation);

        const findCurrentRestaurant = await this.container
          .get<IFindCurrentRestaurantOperation>(IFindCurrentRestaurantOperation);

        const setTimeRange = await this.container
          .get<ISetRestaurantTimeRangeOperation>(ISetRestaurantTimeRangeOperation);

        return new SetRestaurantTimeRangeController(
          validation,
          findCurrentRestaurant,
          setTimeRange
        );
      });
  }

  private registerGetRestaurantInfoController(): void {
    this.container.register(
      IGetRestaurantInfoController,
      async () => {
        const findCurrentRestaurant = await this.container
          .get<IFindCurrentRestaurantOperation>(IFindCurrentRestaurantOperation);

        return new GetRestaurantInfoController(
          findCurrentRestaurant
        );
      });
  }
}

export { RestaurantControllerProvider };
