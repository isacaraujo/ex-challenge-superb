import { IActionController } from '../../../Core/Controller/IActionController';

interface IAddRestaurantTableController extends IActionController {}

const IAddRestaurantTableController = Symbol.for('IAddRestaurantTableController');

export { IAddRestaurantTableController };
