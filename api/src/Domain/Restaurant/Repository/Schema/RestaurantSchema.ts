import { SchemaDefinition } from 'mongoose';

const RestaurantSchema: SchemaDefinition = {
  tablesCount: Number,
  openTime: Number,
  closeTime: Number,
};

export { RestaurantSchema };
