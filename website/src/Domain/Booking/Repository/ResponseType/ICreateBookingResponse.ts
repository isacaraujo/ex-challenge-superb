import { IBookingGuest } from './IBookingGuest'

interface ICreateBookingResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  confirmedAt?: string;
  date: string;
  time: number;
  guest: IBookingGuest;
  totalGuest: number;
  status: string;
}

const ICreateBookingResponse = Symbol.for('ICreateBookingResponse');

export { ICreateBookingResponse };
