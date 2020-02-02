import { IActionController } from '../../../Core/Controller/IActionController';

interface IGetRestaurantInfoController extends IActionController {}

const IGetRestaurantInfoController = Symbol.for('IGetRestaurantInfoController');

export { IGetRestaurantInfoController };
