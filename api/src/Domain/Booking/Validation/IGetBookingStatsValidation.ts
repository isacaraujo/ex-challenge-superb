interface IGetBookingStatsValidation {
  validate(data: any): void;
}

const IGetBookingStatsValidation = Symbol.for('IGetBookingStatsValidation');

export { IGetBookingStatsValidation };
