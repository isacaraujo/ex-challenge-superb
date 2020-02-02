import { IActionController } from '../../../Core/Controller/IActionController';

interface IListBookingController extends IActionController {}

const IListBookingController = Symbol.for('IListBookingController');

export { IListBookingController };
