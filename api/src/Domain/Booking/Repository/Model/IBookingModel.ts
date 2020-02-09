import { Document } from 'mongoose';

import { BookingStatus } from '../../Entity/BookingStatus';
import { IBookingGuestModel } from './IBookingGuestModel';

interface IBookingModel extends Document {
  createdAt: Date;
  updatedAt: Date;
  canceledAt: Date;
  confirmedAt: Date;
  date: string;
  time: number;
  guest: IBookingGuestModel;
  totalGuests: number;
  status: BookingStatus;
  restaurantId: string;
  reservationDate: Date;
}

const IBookingModel = Symbol.for('IBookingModel');

export { IBookingModel };
