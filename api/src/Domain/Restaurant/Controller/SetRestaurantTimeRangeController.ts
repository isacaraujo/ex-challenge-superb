import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import { ISetRestaurantTimeRangeValidation } from '../Validation/ISetRestaurantTimeRangeValidation';
import { ISetRestaurantTimeRangeController } from './ISetRestaurantTimeRangeController';
import { IFindCurrentRestaurantOperation } from '../Operation/IFindCurrentRestaurantOperation';
import { SetRestaurantTimeRangeCommand } from '../Type/Command/SetRestaurantTimeRangeCommand';
import { ISetRestaurantTimeRangeOperation } from '../Operation/ISetRestaurantTimeRangeOperation';

class SetRestaurantTimeRangeController extends ActionController implements ISetRestaurantTimeRangeController {
  public constructor(
    private readonly setTimeRangeValidation: ISetRestaurantTimeRangeValidation,
    private readonly findCurrentRestaurant: IFindCurrentRestaurantOperation,
    private readonly setRestaurantTimeRange: ISetRestaurantTimeRangeOperation
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const payload = request.Body;

      this.setTimeRangeValidation.validate(payload);

      const restaurant = await this.findCurrentRestaurant.execute();

      const command = SetRestaurantTimeRangeCommand.create(
        restaurant,
        payload.openTime,
        payload.closeTime
      );

      await this.setRestaurantTimeRange.execute(command);

      return this.createNoContentResponse();
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { SetRestaurantTimeRangeController };
