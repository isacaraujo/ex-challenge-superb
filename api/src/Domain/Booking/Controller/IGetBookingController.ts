import { IActionController } from '../../../Core/Controller/IActionController';

interface IGetBookingController extends IActionController {}

const IGetBookingController = Symbol.for('IGetBookingController');

export { IGetBookingController };
