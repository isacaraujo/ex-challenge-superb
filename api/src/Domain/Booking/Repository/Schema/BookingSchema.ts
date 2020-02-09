import { SchemaDefinition, Schema } from 'mongoose';

import { BookingGuestSchema } from './BookingGuestSchema';

const BookingSchema: SchemaDefinition = {
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
  canceledAt: { type: Date },
  confirmedAt: { type: Date },
  date: { type: String, required: true, index: true },
  time: { type: Number, required: true, index: true },
  guest: BookingGuestSchema,
  totalGuests: { type: Number, required: true },
  status: { type: String, required: true, index: true },
  restaurantId: { type: Schema.Types.ObjectId, index: true, required: true },
  reservationDate: { type: Date, required: true },
};

export { BookingSchema };
