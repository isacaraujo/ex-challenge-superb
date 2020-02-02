import { SchemaDefinition } from 'mongoose';

import { WorkingDaySchema } from './WorkingDaySchema';

const RestaurantSchema: SchemaDefinition = {
  tablesCount: Number,
  workingDays: [WorkingDaySchema],
};

export { RestaurantSchema };
