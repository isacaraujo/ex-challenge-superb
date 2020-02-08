import { IBookingResponse } from './IBookingResponse';

interface IGetBookingsResponse {
  data: IBookingResponse[];
}

const IGetBookingsResponse = Symbol.for('IGetBookingsResponse');

export { IGetBookingsResponse };
