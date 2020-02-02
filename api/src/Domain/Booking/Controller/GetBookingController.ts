import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import { IGetBookingOperation } from '../Operation/IGetBookingOperation';
import { BookingMapper } from '../Type/Mapper/BookingMapper';
import { IGetBookingController } from './IGetBookingController';

class GetBookingController extends ActionController implements IGetBookingController {
  public constructor(
    private readonly getBooking: IGetBookingOperation
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    const bookingId = request.Params.id;

    try {
      const booking = await this.getBooking.execute(bookingId);

      const mapper = BookingMapper.create(booking);

      return this.createSuccessResponse(mapper);
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { GetBookingController };
