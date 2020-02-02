import { SchemaDefinition } from 'mongoose';

const WorkingDaySchema: SchemaDefinition = {
  dayOfWeek: Number,
  openTime: Number,
  closeTime: Number,
  _id: { id: false },
};

export { WorkingDaySchema };
