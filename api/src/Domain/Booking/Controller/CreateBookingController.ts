import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { ICreateBookingOperation } from '../Operation/ICreateBookingOperation';
import { IGetBookingDateTimeStatsOperation } from '../Operation/IGetBookingDateTimeStatsOperation';
import { CreateBookingCommand } from '../Type/Command/Operation/CreateBookingCommand';
import { BookingMapper } from '../Type/Mapper/BookingMapper';
import { ICreateBookingValidation } from '../Validation/ICreateBookingValidation';
import { ICreateBookingController } from './ICreateBookingController';

class CreateBookingController extends ActionController implements ICreateBookingController {
  public constructor(
    private readonly validation: ICreateBookingValidation,
    private readonly findRestaurant: IFindCurrentRestaurantOperation,
    private readonly getStats: IGetBookingDateTimeStatsOperation,
    private readonly createBooking: ICreateBookingOperation
  ) {
    super();
  }
  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const payload = request.Body;

      this.validation.validate(payload);

      const restaurant = await this.findRestaurant.execute();

      const stats = await this.getStats.execute(restaurant, payload.date, payload.time);

      const command = CreateBookingCommand.create(restaurant, stats, payload);

      const booking = await this.createBooking.execute(command);

      const mapper = BookingMapper.create(booking);

      return this.createCreatedResponse(mapper);
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { CreateBookingController };
