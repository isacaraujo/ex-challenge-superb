import { IActionController } from '../../../Core/Controller/IActionController';

interface ICreateBookingController extends IActionController {}

const ICreateBookingController = Symbol.for('ICreateBookingController');

export { ICreateBookingController };
