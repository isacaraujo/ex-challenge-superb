import { SchemaDefinition } from 'mongoose';

const RestaurantSchema: SchemaDefinition = {
  tablesCount: { type: Number, required: true },
  openTime: { type: Number, required: true },
  closeTime: { type: Number, required: true },
};

export { RestaurantSchema };
