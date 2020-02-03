import { IActionController } from '../../../Core/Controller/IActionController';

interface IGetBookingStatsController extends IActionController {}

const IGetBookingStatsController = Symbol.for('IGetBookingStatsController');

export { IGetBookingStatsController };
