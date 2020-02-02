import { Restaurant } from '../Entity/Restaurant';

interface IFindCurrentRestaurantOperation {
  execute(): Promise<Restaurant>;
}

const IFindCurrentRestaurantOperation = Symbol.for('IFindCurrentRestaurantOperation');

export { IFindCurrentRestaurantOperation };
