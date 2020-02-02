import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import { ISetRestaurantTimeRangeValidation } from '../Validation/ISetRestaurantTimeRangeValidation';
import { SetRestaurantTimeRangeValidation } from '../Validation/SetRestaurantTimeRangeValidation';

class RestaurantValidationProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerSetRestaurantTimeRangeValidation();
  }

  private registerSetRestaurantTimeRangeValidation(): void {
    this.container.register(
      ISetRestaurantTimeRangeValidation,
      async () => Promise.resolve(new SetRestaurantTimeRangeValidation()));
  }
}

export { RestaurantValidationProvider };
