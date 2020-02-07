import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { BookingAvailability } from '../../../Domain/Booking/Entity/BookingAvailability';

interface INewBookingDialog {
  open: boolean;
  title: string;
  content: string;
}

interface INewBookingState {
  date: MaterialUiPickersDate;
  time: string;
  name: string;
  email: string;
  totalGuests: string;
  totalTables: string;
  availableTables: string;
  times: BookingAvailability[];
  dialog: INewBookingDialog;
}

const INewBookingState = Symbol.for('INewBookingState');

export { INewBookingState };
