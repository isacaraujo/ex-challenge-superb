import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { BookingAvailability } from '../../../../Domain/Booking/Entity/BookingAvailability';

interface INewBookingFormState {
  modalOpen: boolean;
  date: MaterialUiPickersDate;
  time: string;
  name: string;
  email: string;
  totalGuests: string;
  times: BookingAvailability[];
}

const INewBookingFormState = Symbol.for('INewBookingFormState');

export { INewBookingFormState };
