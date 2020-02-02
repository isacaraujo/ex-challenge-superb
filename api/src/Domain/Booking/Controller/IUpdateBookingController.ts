import { IActionController } from '../../../Core/Controller/IActionController';

interface IUpdateBookingController extends IActionController {}

const IUpdateBookingController = Symbol.for('IUpdateBookingController');

export { IUpdateBookingController };
