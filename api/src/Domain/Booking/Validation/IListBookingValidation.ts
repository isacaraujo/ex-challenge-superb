interface IListBookingValidation {
  validate(data: any): void;
}

const IListBookingValidation = Symbol.for('IListBookingValidation');

export { IListBookingValidation };
