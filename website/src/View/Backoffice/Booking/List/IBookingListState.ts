import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Booking } from '../../../../Domain/Booking/Entity/Booking';

interface IBookingListState {
  selectedDate: MaterialUiPickersDate;
  bookings: Booking[];
}

const IBookingListState = Symbol.for('IBookingListState');

export { IBookingListState };
