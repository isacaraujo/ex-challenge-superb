interface IUpdateBookingDateValidation {
  validate(data: any): void;
}

const IUpdateBookingDateValidation = Symbol.for('IUpdateBookingDateValidation');

export { IUpdateBookingDateValidation };
