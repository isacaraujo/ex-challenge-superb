interface ICreateBookingValidation {
  validate(data: any): void;
}

const ICreateBookingValidation = Symbol.for('ICreateBookingValidation');

export { ICreateBookingValidation };
