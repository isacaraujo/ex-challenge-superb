import { IActionController } from '../../../Core/Controller/IActionController';

interface IUpdateBookingDateController extends IActionController {}

const IUpdateBookingDateController = Symbol.for('IUpdateBookingDateController');

export { IUpdateBookingDateController };
