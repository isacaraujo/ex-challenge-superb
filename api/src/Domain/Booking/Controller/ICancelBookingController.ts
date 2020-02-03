import { IActionController } from '../../../Core/Controller/IActionController';

interface ICancelBookingController extends IActionController {}

const ICancelBookingController = Symbol.for('ICancelBookingController');

export { ICancelBookingController };
