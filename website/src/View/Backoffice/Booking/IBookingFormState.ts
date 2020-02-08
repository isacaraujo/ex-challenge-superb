import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { BookingAvailability } from '../../../Domain/Booking/Entity/BookingAvailability';

interface IBookingFormState {
  modalOpen: boolean;
  date: MaterialUiPickersDate;
  time: string;
  name: string;
  email: string;
  totalGuests: string;
  times: BookingAvailability[];
}

const IBookingFormState = Symbol.for('IBookingFormState');

export { IBookingFormState };
