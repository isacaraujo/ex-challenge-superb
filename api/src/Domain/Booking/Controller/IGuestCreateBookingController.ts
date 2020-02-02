import { IActionController } from '../../../Core/Controller/IActionController';

interface IGuestCreateBookingController extends IActionController {}

const IGuestCreateBookingController = Symbol.for('IGuestCreateBookingController');

export { IGuestCreateBookingController };
