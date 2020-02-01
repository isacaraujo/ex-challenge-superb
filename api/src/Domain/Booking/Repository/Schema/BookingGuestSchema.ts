import { SchemaDefinition } from 'mongoose';

const BookingGuestSchema: SchemaDefinition = {
  name: String,
  email: String,
};

export { BookingGuestSchema };
