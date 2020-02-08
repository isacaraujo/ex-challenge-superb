interface IRestaurantResponseType {
  tablesCount: number;
  openTime: number;
  closeTime: number;
  closeInNextDay: boolean;
}

const IRestaurantResponseType = Symbol.for('IRestaurantResponseType');

export { IRestaurantResponseType };
