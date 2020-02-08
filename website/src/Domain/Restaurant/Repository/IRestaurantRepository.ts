import { Restaurant } from '../Entity/Restaurant';

interface IRestaurantRepository {
  findCurrent(): Promise<Restaurant>;
  setTimeRange(openTime: number, closeTime: number): Promise<void>;
  addTable(): Promise<void>;
}

const IRestaurantRepository = Symbol.for('IRestaurantRepository');

export { IRestaurantRepository };
