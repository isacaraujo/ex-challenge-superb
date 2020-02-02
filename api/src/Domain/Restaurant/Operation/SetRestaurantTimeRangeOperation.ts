import { SaveRecordError } from '../../../Core/Error/Repository/SaveRecordError';
import { ILogger } from '../../../Core/Logger/ILogger';
import { UpdateRestaurantGenericError } from '../Error/Operation/UpdateRestaurantGenericError';
import { IRestaurantRepository } from '../Repository/IRestaurantRepository';
import { SetRestaurantTimeRangeCommand } from '../Type/Command/SetRestaurantTimeRangeCommand';
import { ISetRestaurantTimeRangeOperation } from './ISetRestaurantTimeRangeOperation';
import { WorkingDay } from '../Entity/WorkingDay';

class SetRestaurantTimeRangeOperation implements ISetRestaurantTimeRangeOperation {
  public constructor(
    private readonly repository: IRestaurantRepository,
    private readonly logger: ILogger
  ) {}

  public async execute(command: SetRestaurantTimeRangeCommand): Promise<void> {
    const restaurant = command.Restaurant;
    const workdaysCommand = command.Workdays;

    try {
      const workdays = workdaysCommand.map(workday => 
        WorkingDay.create(workday.dayOfWeek, workday.openTime, workday.closeTime));

      restaurant.WorkingDays = workdays;

      restaurant.sortWorkingDays();

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

export { SetRestaurantTimeRangeOperation };
