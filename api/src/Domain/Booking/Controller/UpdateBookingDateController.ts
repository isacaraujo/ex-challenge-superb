import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { IGetBookingOperation } from '../Operation/IGetBookingOperation';
import { IUpdateBookingDateOperation } from '../Operation/IUpdateBookingDateOperation';
import { UpdateBookingDateCommand } from '../Type/Command/Operation/UpdateBookingDateCommand';
import { IUpdateBookingDateValidation } from '../Validation/IUpdateBookingDateValidation';
import { IUpdateBookingDateController } from './IUpdateBookingDateController';

class UpdateBookingDateController extends ActionController implements IUpdateBookingDateController {
  public constructor(
    private readonly validation: IUpdateBookingDateValidation,
    private readonly findRestaurant: IFindCurrentRestaurantOperation,
    private readonly getBooking: IGetBookingOperation,
    private readonly updateBookingDate: IUpdateBookingDateOperation
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    const bookingId = request.Params.id;
    const payload = request.Body;

    try {
      this.validation.validate(payload);

      const booking = await this.getBooking.execute(bookingId);

      const restaurant = await this.findRestaurant.execute();

      const command = UpdateBookingDateCommand.create(booking, restaurant, payload);

      await this.updateBookingDate.execute(command);

      return this.createNoContentResponse();
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { UpdateBookingDateController };
