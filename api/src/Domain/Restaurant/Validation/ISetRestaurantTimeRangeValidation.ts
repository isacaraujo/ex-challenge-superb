interface ISetRestaurantTimeRangeValidation {
  validate(data: any): void;
}

const ISetRestaurantTimeRangeValidation = Symbol.for('ISetRestaurantTimeRangeValidation');

export { ISetRestaurantTimeRangeValidation };
