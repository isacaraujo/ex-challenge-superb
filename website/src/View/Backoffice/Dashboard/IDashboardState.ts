import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface IDashboardState {
  selectedDate: MaterialUiPickersDate;
  bookings: any[];
}

const IDashboardState = Symbol.for('IDashboardState');
const IBookingEntry = Symbol.for('IBookingEntry');

export { IDashboardState, IBookingEntry };
