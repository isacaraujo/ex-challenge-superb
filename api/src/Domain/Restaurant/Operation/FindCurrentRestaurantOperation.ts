import { FindRecordError } from '../../../Core/Error/Repository/FindRecordError';
import { RecordNotFoundError } from '../../../Core/Error/Repository/RecordNotFoundError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { Restaurant } from '../Entity/Restaurant';
import { FindRestaurantGenericError } from '../Error/Operation/FindRestaurantGenericError';
import { RestaurantNotFoundError } from '../Error/Operation/RestaurantNotFoundError';
import { IRestaurantRepository } from '../Repository/IRestaurantRepository';
import { IFindCurrentRestaurantOperation } from './IFindCurrentRestaurantOperation';

class FindCurrentRestaurantOperation implements IFindCurrentRestaurantOperation {
  public constructor(
    private readonly repository: IRestaurantRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(): Promise<Restaurant> {
    try {
      return await this.repository.findOne();
    } catch (error) {
      this.throwSpecificErrorBasedOn(error);
    }
  }

  private throwSpecificErrorBasedOn(error: Error): void {
    switch (error.constructor) {
      case RecordNotFoundError:
        throw new RestaurantNotFoundError();
      case FindRecordError:
        const findError = error as FindRecordError;
        
        this.logger.error(`FindRestaurantGenericError: ${error.message}`, { error: findError.OriginalError });

        throw new FindRestaurantGenericError();
      default:
        const message = `FindRestaurantGenericError: ${error.constructor.name}: ${error.message}`;

        this.logger.error(message, { error });

        throw new FindRestaurantGenericError();
    }
  }
}

export { FindCurrentRestaurantOperation };
