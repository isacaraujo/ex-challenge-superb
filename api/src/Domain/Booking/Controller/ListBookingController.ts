import { ActionController } from '../../../Core/Controller/ActionController';
import { IListBookingController } from './IListBookingController';
import { IHttpRequest } from '../../../Core/Http/Type/IHttpRequest';
import { IHttpResponse } from '../../../Core/Http/Type/IHttpResponse';
import { BookingMapper } from '../Type/Mapper/BookingMapper';
import { IListBookingValidation } from '../Validation/IListBookingValidation';
import { IListBookingOperation } from '../Operation/IListBookingOperation';
import { ListBookingQuery } from '../Type/Query/ListBookingQuery';

class ListBookingController extends ActionController implements IListBookingController {
  public constructor(
    private readonly listBookingValidation: IListBookingValidation,
    private readonly listBooking: IListBookingOperation
  ) {
    super();
  }

  public async perform(request: IHttpRequest): Promise<IHttpResponse> {
    try {
      const payload = request.Query;

      this.listBookingValidation.validate(payload);

      const query = ListBookingQuery.create(payload);

      const bookings = await this.listBooking.execute(query);

      const mapper = BookingMapper.createFromCollection(bookings);

      return this.createSuccessResponse({ data: mapper });
    } catch (error) {
      return this.createErrorResponse(error);
    }
  }
}

export { ListBookingController };
