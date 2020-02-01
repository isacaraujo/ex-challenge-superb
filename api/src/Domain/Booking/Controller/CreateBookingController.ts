import { ActionController } from '../../../Core/Controller/ActionController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import { ICreateBookingOperation } from '../Operation/ICreateBookingOperation';
import { CreateBookingCommand } from '../Type/Command/Operation/CreateBookingCommand';
import { BookingMapper } from '../Type/Mapper/BookingMapper';
import { ICreateBookingValidation } from '../Validation/ICreateBookingValidation';
import { ICreateBookingController } from './ICreateBookingController';

class CreateBookingController extends ActionController implements ICreateBookingController {
  public constructor(
    private readonly createBooking: ICreateBookingOperation,
    private readonly createBookingValidation: ICreateBookingValidation
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const data = request.Body;

      this.createBookingValidation.validate(data);

      const command = CreateBookingCommand.factory(data);

      const booking = await this.createBooking.execute(command);

      const mapper = BookingMapper.create(booking);

      return this.createCreatedResponse(mapper);
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { CreateBookingController };
