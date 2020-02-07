interface IBookingGuest {
  name: string;
  email: string;
}

const IBookingGuest = Symbol.for('IBookingGuest');

export { IBookingGuest };
