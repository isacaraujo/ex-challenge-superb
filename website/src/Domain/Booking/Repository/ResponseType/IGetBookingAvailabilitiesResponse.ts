import { IBookingAvailability } from './IBookingAvailability';

interface IGetBookingAvailabilitiesResponse {
  data: IBookingAvailability[];
}

const IGetBookingAvailabilitiesResponse = Symbol.for('IGetBookingAvailabilitiesResponse');

export { IGetBookingAvailabilitiesResponse };
