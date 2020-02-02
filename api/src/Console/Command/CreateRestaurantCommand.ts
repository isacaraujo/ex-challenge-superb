import { IContainerService } from '../../Core/Container/IContainerService';

import { IConsoleCommand } from '../IConsoleCommand';
import { IRestaurantRepository } from '../../Domain/Restaurant/Repository/IRestaurantRepository';
import { ILogger } from '../../Core/Logger/ILogger';
import { Restaurant } from '../../Domain/Restaurant/Entity/Restaurant';
import { RecordNotFoundError } from '../../Core/Error/Repository/RecordNotFoundError';

class CreateRestaurantCommand implements IConsoleCommand {
  private restaurantRepository?: IRestaurantRepository;
  private logger?: ILogger;

  public constructor(private readonly container: IContainerService) {}

  public async execute(): Promise<void> {
    this.restaurantRepository = await this.container.get<IRestaurantRepository>(IRestaurantRepository);
    this.logger = await this.container.get<ILogger>(ILogger);

    let restaurant: Restaurant;

    try {
      restaurant = await this.find();

      if (restaurant !== undefined) {
        this.logger.info('Restaurant already exists.', restaurant);

        return;
      }

      restaurant = this.build();

      await this.restaurantRepository.create(restaurant);

      this.logger.info('Restaurant created', restaurant);
    } catch (error) {
      this.logger.error('Create restaurant failed', error);
    }
  }

  private async find(): Promise<Restaurant> {
    try {
      return await this.restaurantRepository.findOne();
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return undefined;
      }

      throw error;
    }
  }

  private build(): Restaurant {
    const restaurant = new Restaurant();

    restaurant.TablesCount = 0;
    restaurant.WorkingDays = [];

    return restaurant;
  }
}

export { CreateRestaurantCommand };
