import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { UpdateRestaurantGenericError } from '../Error/Operation/UpdateRestaurantGenericError';
import { IRestaurantRepository } from '../Repository/IRestaurantRepository';
import { IAddRestaurantTableOperation } from './IAddRestaurantTableOperation';
import { Restaurant } from '../Entity/Restaurant';

class AddRestaurantTableOperation implements IAddRestaurantTableOperation {
  public constructor(
    private readonly repository: IRestaurantRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(restaurant: Restaurant): Promise<void> {
    try {
      restaurant.incrementTable();

      await this.repository.update(restaurant);
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case SaveRecordError:
        const saveError = error as SaveRecordError;

        this.logger.error(`UpdateRestaurantGenericError: ${error.message}`, { error: saveError.OriginalError });

        throw new UpdateRestaurantGenericError();
      default:
        const message = `UpdateRestaurantGenericError: ${error.constructor.name}: ${error.message}`;

        this.logger.error(message, { error });

        throw new UpdateRestaurantGenericError();
    }
  }
}

export { AddRestaurantTableOperation };
