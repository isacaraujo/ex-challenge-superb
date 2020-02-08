import { Booking } from '../../../../Domain/Booking/Entity/Booking'

interface EditBookingState {
  modalOpen: boolean;
  bookingNotFoundError: boolean;
  name: string;
  email: string;
  totalGuests: string;
  booking?: Booking;
}

const EditBookingState = Symbol.for('EditBookingState');

export { EditBookingState };
