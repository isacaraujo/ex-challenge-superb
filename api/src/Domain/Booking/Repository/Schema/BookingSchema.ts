import { SchemaDefinition } from 'mongoose';

import { BookingGuestSchema } from './BookingGuestSchema';

const BookingSchema: SchemaDefinition = {
  createdAt: Date,
  updatedAt: Date,
  canceledAt: Date,
  confirmedAt: Date,
  date: String,
  time: Number,
  guest: BookingGuestSchema,
  totalGuests: Number,
  status: String,
  restaurantId: String,
  reservationDate: Date,
};

export { BookingSchema };
  