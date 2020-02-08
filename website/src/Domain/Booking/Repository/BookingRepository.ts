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
import { ICreateBookingResponse } from './ResponseType/ICreateBookingResponse';
import { IGetBookingAvailabilitiesResponse } from './ResponseType/IGetBookingAvailabilitiesResponse';
import { BookingAvailabilityRecordFactory } from './Factory/BookingAvailabilityRecordFactory';

class BookingRepository implements IBookingRepository {
  private static readonly POST_BOOKING = '/v1/bookings';

  private static readonly GET_AVAILABILITY = '/v1/bookings/stats';

  public constructor(private readonly httpClient: IHttpClient) {}

  public async create(command: CreateBookingCommand): Promise<Booking> {
    try {
      const record = BookingRecordFactory.createRecordFromCommand(command);

      const response = await this.httpClient
        .post<ICreateBookingResponse>(BookingRepository.POST_BOOKING, record);

      return BookingRecordFactory.fromRecord(response);
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
