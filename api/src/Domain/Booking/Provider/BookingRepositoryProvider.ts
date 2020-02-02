import { IContainerService } from '../../../Core/Container/IContainerService';
import {
    IMongooseConnection
} from '../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection';
import { IProvider } from '../../../Core/Provider/IProvider';
import { BookingRepository } from '../Repository/BookingRepository';
import { BookingStatsRepository } from '../Repository/BookingStatsRepository';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { IBookingStatsRepository } from '../Repository/IBookingStatsRepository';

class BookingRepositoryProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerBookingRepository();
    this.registerBookingStatsRepository();
  }

  private registerBookingRepository(): void {
    this.container.register(
      IBookingRepository,
      async () => {
        const connection = await this.container
          .get<IMongooseConnection>(IMongooseConnection);

        const repository = new BookingRepository(connection);

        return repository;
      }
    )
  }

  private registerBookingStatsRepository(): void {
    this.container.register(
      IBookingStatsRepository,
      async () => {
        const connection = await this.container.get<IMongooseConnection>(IMongooseConnection);

        const repository = new BookingStatsRepository(connection);

        return repository;
      }
    )
  }
}

export { BookingRepositoryProvider };
