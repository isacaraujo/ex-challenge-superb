import { Document } from 'mongoose';
import { IWorkingDayModel } from './IWorkingDayModel';

interface IRestaurantModel extends Document {
  tablesCount: number;
  workingDays: IWorkingDayModel[];
}

const IRestaurantModel = Symbol.for('IRestaurantModel');

export { IRestaurantModel };
