import { ForbiddenError } from '../../../Core/HttpClient/Error/ForbiddenError';
import { NotFoundError } from '../../../Core/HttpClient/Error/NotFoundError';
import { IHttpClient } from '../../../Core/HttpClient/IHttpClient';
import { GenericRepositoryError } from '../../Booking/Error/Repository/GenericRepositoryError';
import { InvalidOperationError } from '../../Booking/Error/Repository/InvalidOperationError';
import { RecordNotFoundError } from '../../Booking/Error/Repository/RecordNotFoundError';
import { Restaurant } from '../Entity/Restaurant';
import { RestaurantRecordFactory } from './Factory/RestaurantRecordFactory';
import { IRestaurantRepository } from './IRestaurantRepository';
import { IRestaurantResponseType } from './ResponseType/IRestaurantResponseType';

class RestaurantRepository implements IRestaurantRepository {
  private static readonly GET_CURRENT_RESTAURANT = '/v1/restaurants/current';

  private static readonly SET_TIME_RANGE = '/v1/restaurants/current/timerange';

  private static readonly ADD_TABLE = '/v1/restaurants/current/tables';

  public constructor(private readonly httpClient: IHttpClient) {}

  public async findCurrent(): Promise<Restaurant> {
    try {
      const record = await this.httpClient
        .get<IRestaurantResponseType>(RestaurantRepository.GET_CURRENT_RESTAURANT);

      return RestaurantRecordFactory.createFromRecord(record);
    } catch (error) {
      const repositoryError = this.getSpecificErrorBasedOn(error);

      throw repositoryError;
    }
  }

  public async setTimeRange(openTime: number, closeTime: number): Promise<void> {
    const payload = {
      openTime,
      closeTime
    };

    try {
      await this.httpClient
        .put<any>(RestaurantRepository.SET_TIME_RANGE, payload);
    } catch (error) {
      const repositoryError = this.getSpecificErrorBasedOn(error);

      throw repositoryError;
    }
  }

  public async addTable(): Promise<void> {
    try {
      await this.httpClient
        .post<any>(RestaurantRepository.ADD_TABLE);
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

export { RestaurantRepository };
