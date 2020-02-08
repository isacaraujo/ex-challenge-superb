import { IBookingGuest } from './IBookingGuest'

interface IBookingResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  date: string;
  time: number;
  guest: IBookingGuest;
  totalGuests: number;
  status: string;
}

const IBookingResponse = Symbol.for('IBookingResponse');

export { IBookingResponse };
