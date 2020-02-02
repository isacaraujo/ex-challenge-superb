import { Restaurant } from '../Entity/Restaurant';

interface IRestaurantRepository {
  create(restaurant: Restaurant): Promise<void>;

  findOne(): Promise<Restaurant>;
}

const IRestaurantRepository = Symbol.for('IRestaurantRepository');

export { IRestaurantRepository };
