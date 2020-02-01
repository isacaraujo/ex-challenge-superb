import { Document } from 'mongoose';

import { BookingStatus } from '../../Entity/BookingStatus';
import { IBookingGuestModel } from './IBookingGuestModel';

interface IBookingModel extends Document {
  createdAt: Date;
  updatedAt: Date;
  canceledAt: Date;
  confirmedAt: Date;
  date: string;
  time: string;
  guest: IBookingGuestModel;
  totalGuests: number;
  status: BookingStatus;
}

const IBookingModel = Symbol.for('IBookingModel');

export { IBookingModel };
