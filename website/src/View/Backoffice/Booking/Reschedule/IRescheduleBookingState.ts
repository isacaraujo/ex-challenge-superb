import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

import { Booking } from '../../../../Domain/Booking/Entity/Booking';
import { BookingAvailability } from '../../../../Domain/Booking/Entity/BookingAvailability';

interface IRescheduleBookingState {
  modalOpen: boolean;
  bookingNotFoundError: boolean;
  booking: Booking | undefined;
  date: MaterialUiPickersDate;
  time: string;
  times: BookingAvailability[];
}

const IRescheduleBookingState = Symbol.for('IRescheduleBookingState');

export { IRescheduleBookingState };
