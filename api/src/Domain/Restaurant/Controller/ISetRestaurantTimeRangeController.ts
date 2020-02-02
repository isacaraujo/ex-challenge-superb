import { IActionController } from '../../../Core/Controller/IActionController';

interface ISetRestaurantTimeRangeController extends IActionController {}

const ISetRestaurantTimeRangeController = Symbol.for('ISetRestaurantTimeRangeController');

export { ISetRestaurantTimeRangeController };
