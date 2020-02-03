import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { IGetBookingStatsOperation } from '../Operation/IGetBookingStatsOperation';
import { BookingStatsMapper } from '../Type/Mapper/BookingStatsMapper';
import { GetBookingStatsQuery } from '../Type/Query/GetBookingStatsQuery';
import { IGetBookingStatsValidation } from '../Validation/IGetBookingStatsValidation';
import { IGetBookingStatsController } from './IGetBookingStatsController';

class GetBookingStatsController extends ActionController implements IGetBookingStatsController {
  public constructor(
    private readonly validation: IGetBookingStatsValidation,
    private readonly findRestaurant: IFindCurrentRestaurantOperation,
    private readonly getBookingStats: IGetBookingStatsOperation
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    const data = request.Query;

    try {
      this.validation.validate(data);

      const restaurant = await this.findRestaurant.execute();

      const query = GetBookingStatsQuery.create(restaurant, data);

      const allStats = await this.getBookingStats.execute(query);

      const mappers = BookingStatsMapper.createFromCollection(restaurant, allStats);

      return this.createSuccessResponse({ data: mappers });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetBookingStatsController };
