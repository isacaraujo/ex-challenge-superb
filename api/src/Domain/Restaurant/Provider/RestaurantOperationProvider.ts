import { IContainerService } from '../../../Core/Container/IContainerService';
import { ILogger } from '../../../Core/Logger/ILogger';
import { IProvider } from '../../../Core/Provider/IProvider';
import { AddRestaurantTableOperation } from '../Operation/AddRestaurantTableOperation';
import { FindCurrentRestaurantOperation } from '../Operation/FindCurrentRestaurantOperation';
import { IAddRestaurantTableOperation } from '../Operation/IAddRestaurantTableOperation';
import { IFindCurrentRestaurantOperation } from '../Operation/IFindCurrentRestaurantOperation';
import { ISetRestaurantTimeRangeOperation } from '../Operation/ISetRestaurantTimeRangeOperation';
import { SetRestaurantTimeRangeOperation } from '../Operation/SetRestaurantTimeRangeOperation';
import { IRestaurantRepository } from '../Repository/IRestaurantRepository';

class RestaurantOperationProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerFindRestaurantOperation();
    this.registerAddRestaurantTableOperation();
    this.registerSetRestaurantTimeRangeOperation();
  }

  private registerFindRestaurantOperation(): void {
    this.container.register(
      IFindCurrentRestaurantOperation,
      async () => {
        const repository = await this.container
          .get<IRestaurantRepository>(IRestaurantRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new FindCurrentRestaurantOperation(repository, logger);
      });
  }

  private registerAddRestaurantTableOperation(): void {
    this.container.register(
      IAddRestaurantTableOperation,
      async () => {
        const repository = await this.container
          .get<IRestaurantRepository>(IRestaurantRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new AddRestaurantTableOperation(repository, logger);
      });
  }

  private registerSetRestaurantTimeRangeOperation(): void {
    this.container.register(
      ISetRestaurantTimeRangeOperation,
      async () => {
        const repository = await this.container
          .get<IRestaurantRepository>(IRestaurantRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new SetRestaurantTimeRangeOperation(repository, logger);
      });
  }
}

export { RestaurantOperationProvider };
