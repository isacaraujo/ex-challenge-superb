import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import { IGuestCreateBookingOperation } from '../Operation/IGuestCreateBookingOperation';
import { CreateBookingCommand } from '../Type/Command/Operation/CreateBookingCommand';
import { BookingMapper } from '../Type/Mapper/BookingMapper';
import { ICreateBookingValidation } from '../Validation/ICreateBookingValidation';
import { IGuestCreateBookingController } from './IGuestCreateBookingController';
import { IFindCurrentRestaurantOperation } from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';

class GuestCreateBookingController extends ActionController implements IGuestCreateBookingController {
  public constructor(
    private readonly findRestaurant: IFindCurrentRestaurantOperation,
    private readonly createBooking: IGuestCreateBookingOperation,
    private readonly createBookingValidation: ICreateBookingValidation
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const data = request.Body;

      this.createBookingValidation.validate(data);

      const restaurant = await this.findRestaurant.execute();

      const command = CreateBookingCommand.create(restaurant, data);

      const booking = await this.createBooking.execute(command);

      const mapper = BookingMapper.create(booking);

      return this.createCreatedResponse(mapper);
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GuestCreateBookingController };
