import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import { IGetBookingOperation } from '../Operation/IGetBookingOperation';
import { IUpdateBookingOperation } from '../Operation/IUpdateBookingOperation';
import { UpdateBookingCommand } from '../Type/Command/Operation/UpdateBookingCommand';
import { IUpdateBookingValidation } from '../Validation/IUpdateBookingValidation';
import { IUpdateBookingController } from './IUpdateBookingController';

class UpdateBookingController extends ActionController implements IUpdateBookingController {
  public constructor(
    private readonly validation: IUpdateBookingValidation,
    private readonly getBooking: IGetBookingOperation,
    private readonly updateBooking: IUpdateBookingOperation
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    const bookingId = request.Params.id;
    const payload = request.Body;

    try {
      this.validation.validate(payload);

      const booking = await this.getBooking.execute(bookingId);

      const command = UpdateBookingCommand.create(booking, payload);

      await this.updateBooking.execute(command);

      return this.createNoContentResponse();
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { UpdateBookingController };
