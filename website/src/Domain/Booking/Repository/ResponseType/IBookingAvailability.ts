interface IBookingAvailability {
  date: string;
  time: number;
  availableSlots: number;
}

const IBookingAvailability = Symbol.for('IBookingAvailability');

export { IBookingAvailability };
