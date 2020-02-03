import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import { IGetBookingOperation } from '../Operation/IGetBookingOperation';
import { ICancelBookingOperation } from '../Operation/ICancelBookingOperation';
import { ICancelBookingController } from './ICancelBookingController';

class CancelBookingController extends ActionController implements ICancelBookingController {
  public constructor(
    private readonly getBooking: IGetBookingOperation,
    private readonly cancelBooking: ICancelBookingOperation
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    const bookingId = request.Params.id;

    try {
      const booking = await this.getBooking.execute(bookingId);

      await this.cancelBooking.execute(booking);

      return this.createNoContentResponse();
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { CancelBookingController };
