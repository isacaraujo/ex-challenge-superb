interface IRestaurantEditState {
  openTime: string;
  closeTime: string;
  tablesCount: number;
  times: number[];
  modalLoadingOpen: boolean;
}

const IRestaurantEditState = Symbol.for('IRestaurantEditState');

export { IRestaurantEditState };
