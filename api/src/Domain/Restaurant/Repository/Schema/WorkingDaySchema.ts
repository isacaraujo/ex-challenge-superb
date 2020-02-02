import { SchemaDefinition } from 'mongoose';

const WorkingDaySchema: SchemaDefinition = {
  dayOfWeek: Number,
  openTime: Number,
  closeTimeTime: Number,
};

export { WorkingDaySchema };
