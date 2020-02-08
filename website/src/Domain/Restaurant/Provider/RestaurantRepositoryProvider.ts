import { IProvider } from '../../../Core/Provider/IProvider';
import { IContainerService } from '../../../Core/Container/IContainerService';
import { IRestaurantRepository } from '../Repository/IRestaurantRepository';
import { RestaurantRepository } from '../Repository/RestaurantRepository';
import { HttpClientFactory } from '../../../Core/HttpClient/Factory/HttpClientFactory';
import { IApplicationConfiguration } from '../../../Config/IApplicationConfiguration';

class RestaurantRepositoryProvider implements IProvider {
  public constructor(
    private readonly container: IContainerService
  ) {}

  public register(): void {
    this.registerRestaurantRepository();
  }

  private registerRestaurantRepository(): void {
    this.container.register(
      IRestaurantRepository,
      async () => {
        const config = await this.container
          .get<IApplicationConfiguration>(IApplicationConfiguration);

        const httpClient = HttpClientFactory.create(config.httpBaseUrl());

        return new RestaurantRepository(httpClient);
      })
  }
}

export { RestaurantRepositoryProvider };
