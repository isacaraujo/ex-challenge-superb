import { IProvider } from '../../../Core/Provider/IProvider';
import { IContainerService } from '../../../Core/Container/IContainerService';
import { IRestaurantRepository } from '../Repository/IRestaurantRepository';
import { RestaurantRepository } from '../Repository/RestaurantRepository';
import { IMongooseConnection } from '../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection';

class RestaurantRepositoryProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerRestaurantRepository();
  }

  private registerRestaurantRepository(): void {
    this.container.register(
      IRestaurantRepository,
      async () => {
        const connection = await this.container
          .get<IMongooseConnection>(IMongooseConnection);

        return new RestaurantRepository(connection);
      });
  }
}

export { RestaurantRepositoryProvider };
