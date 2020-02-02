import { SetRestaurantTimeRangeCommand } from '../Type/Command/SetRestaurantTimeRangeCommand';

interface ISetRestaurantTimeRangeOperation {
  execute(command: SetRestaurantTimeRangeCommand): Promise<void>;
}

const ISetRestaurantTimeRangeOperation = Symbol.for('ISetRestaurantTimeRangeOperation');

export { ISetRestaurantTimeRangeOperation };
