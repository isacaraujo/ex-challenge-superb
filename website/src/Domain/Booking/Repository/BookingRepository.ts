import { Moment } from 'moment';

import { IHttpClient } from '../../../Core/HttpClient/IHttpClient';
import { Booking } from '../Entity/Booking';
import { BookingAvailability } from '../Entity/BookingAvailability';
import { IBookingRepository } from './IBookingRepository';
import { CreateBookingCommand } from '../Type/Command/CreateBookingCommand';
import { NotFoundError } from '../../../Core/HttpClient/Error/NotFoundError';
import { ForbiddenError } from '../../../Core/HttpClient/Error/ForbiddenError';
import { InvalidOperationError } from '../Error/Repository/InvalidOperationError';
import { RecordNotFoundError } from '../Error/Repository/RecordNotFoundError';
import { GenericRepositoryError } from '../Error/Repository/GenericRepositoryError';
import { BookingRecordFactory } from './Factory/BookingRecordFactory';
import { IBookingResponse } from './ResponseType/IBookingResponse';
import { IGetBookingAvailabilitiesResponse } from './ResponseType/IGetBookingAvailabilitiesResponse';
import { BookingAvailabilityRecordFactory } from './Factory/BookingAvailabilityRecordFactory';
import { IGetBookingsResponse } from './ResponseType/IGetBookingsResponse';
import { UpdateBookingCommand } from '../Type/Command/UpdateBookingCommand';
import { UpdateTimeBookingCommand } from '../Type/Command/UpdateTimeBookingCommand';


class BookingRepository implements IBookingRepository {
  private static readonly POST_BOOKING = '/v1/restaurants/current/bookings';

  private static readonly UPDATE_BOOKING = '/v1/bookings/:bookingId';

  private static readonly UPDATE_BOOKING_DATE = '/v1/bookings/:bookingId/date';

  private static readonly GET_BOOKINGS = '/v1/restaurants/current/bookings';

  private static readonly GET_BOOKING_BY_ID = '/v1/bookings/:bookingId';

  private static readonly CANCEL_BOOKING = '/v1/bookings/:bookingId';

  private static readonly GET_AVAILABILITY = '/v1/bookings/stats';

  public constructor(private readonly httpClient: IHttpClient) {}

  public async create(command: CreateBookingCommand): Promise<Booking> {
    try {
      const record = BookingRecordFactory.createRecordFromCommand(command);

      const response = await this.httpClient
        .post<IBookingResponse>(BookingRepository.POST_BOOKING, record);

      return BookingRecordFactory.fromRecord(response);
    } catch (error) {
      const repositoryError = this.getSpecificErrorBasedOn(error);

      throw repositoryError;
    }
  }

  public async update(command: UpdateBookingCommand): Promise<void> {
    const payload = {
      guestName: command.GuestName,
      guestEmail: command.GuestEmail,
      totalGuests: command.TotalGuests,
    };

    const booking = command.Booking;

    const bookingId = String(booking.Id);

    const url = BookingRepository.UPDATE_BOOKING.replace(':bookingId', bookingId);

    try {
      await this.httpClient.put<any>(url, payload);
    } catch (error) {
      const repositoryError = this.getSpecificErrorBasedOn(error);

      throw repositoryError;
    }
  }

  public async updateTime(command: UpdateTimeBookingCommand): Promise<void> {
    const payload = {
      date: command.Date.format('YYYY-MM-DD'),
      time: command.Time,
    };

    const booking = command.Booking;

    const bookingId = String(booking.Id);

    const url = BookingRepository.UPDATE_BOOKING_DATE.replace(':bookingId', bookingId);

    try {
      await this.httpClient.put<any>(url, payload);
    } catch (error) {
      const repositoryError = this.getSpecificErrorBasedOn(error);

      throw repositoryError;
    }
  }

  public async findAllByDate(date: Moment): Promise<Booking[]> {
    const formatedDate = date.format('YYYY-MM-DD');
    const url = `${BookingRepository.GET_BOOKINGS}?date=${formatedDate}`;

    try {
      const response = await this.httpClient
        .get<IGetBookingsResponse>(url);

      return response.data.map(record => BookingRecordFactory.fromRecord(record));
    } catch (error) {
      const repositoryError = this.getSpecificErrorBasedOn(error);

      throw repositoryError;
    }
  }

  public async findById(bookingId: string): Promise<Booking> {
    const url = BookingRepository.GET_BOOKING_BY_ID.replace(':bookingId', bookingId);

    try {
      const response = await this.httpClient
        .get<IBookingResponse>(url);

      return BookingRecordFactory.fromRecord(response);
    } catch (error) {
      const repositoryError = this.getSpecificErrorBasedOn(error);

      throw repositoryError;
    }
  }

  public async cancel(booking: Booking): Promise<void> {
    const bookingId = String(booking.Id);

    const url = BookingRepository.CANCEL_BOOKING.replace(':bookingId', bookingId);

    try {
      await this.httpClient.delete<any>(url);
    } catch (error) {
      const repositoryError = this.getSpecificErrorBasedOn(error);

      throw repositoryError;
    }
  }

  public async getAvailabilityByDate(date: Moment): Promise<BookingAvailability[]> {
    try {
      const formatedDate = date!.format('YYYY-MM-DD');

      const response = await this.httpClient
        .get<IGetBookingAvailabilitiesResponse>(`${BookingRepository.GET_AVAILABILITY}?date=${formatedDate}`);

      return BookingAvailabilityRecordFactory.fromResultSet(response.data);
    } catch (error) {
      const repositoryError = this.getSpecificErrorBasedOn(error);

      throw repositoryError;
    }
  }

  private getSpecificErrorBasedOn(error: Error): Error {
    switch (error.constructor) {
      case ForbiddenError:
        return new InvalidOperationError(error.message);
      case NotFoundError:
        return new RecordNotFoundError('Booking not found');
      default:
        return new GenericRepositoryError(error.message);
    }
  }
}

export { BookingRepository };
