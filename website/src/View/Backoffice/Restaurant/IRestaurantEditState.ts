interface IRestaurantEditState {
  openTime: string;
  closeTime: string;
  tablesCount: number;
  times: number[];
  modalAddTableOpen: boolean;
}

const IRestaurantEditState = Symbol.for('IRestaurantEditState');

export { IRestaurantEditState };
