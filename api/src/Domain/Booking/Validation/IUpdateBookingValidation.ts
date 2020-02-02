interface IUpdateBookingValidation {
  validate(data: any): void;
}

const IUpdateBookingValidation = Symbol.for('IUpdateBookingValidation');

export { IUpdateBookingValidation };
