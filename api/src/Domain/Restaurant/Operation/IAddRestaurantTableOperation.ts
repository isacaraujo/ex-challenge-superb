import { Restaurant } from '../Entity/Restaurant';

interface IAddRestaurantTableOperation {
  execute(restaurant: Restaurant): Promise<void>;
}

const IAddRestaurantTableOperation = Symbol.for('IAddRestaurantTableOperation');

export { IAddRestaurantTableOperation };
