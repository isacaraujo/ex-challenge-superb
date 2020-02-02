import { Document } from 'mongoose';

interface IRestaurantModel extends Document {
  tablesCount: number;
  openTime: number;
  closeTime: number;
}

const IRestaurantModel = Symbol.for('IRestaurantModel');

export { IRestaurantModel };
