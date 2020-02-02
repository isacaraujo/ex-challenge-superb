import { Restaurant } from '../Entity/Restaurant';

interface IRestaurantRepository {
  findOne(): Promise<Restaurant>;

  create(restaurant: Restaurant): Promise<void>;

  update(restaurant: Restaurant): Promise<void>;
}

const IRestaurantRepository = Symbol.for('IRestaurantRepository');

export { IRestaurantRepository };
