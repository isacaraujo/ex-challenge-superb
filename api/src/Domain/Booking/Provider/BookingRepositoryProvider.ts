import { IContainerService } from '../../../Core/Container/IContainerService';
import {
    IMongooseConnection
} from '../../../Core/Database/Driver/Mongoose/Connection/IMongooseConnection';
import { IProvider } from '../../../Core/Provider/IProvider';
import { BookingRepository } from '../Repository/BookingRepository';
import { IBookingRepository } from '../Repository/IBookingRepository';

class BookingRepositoryProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerBookingRepository();
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
}

export { BookingRepositoryProvider };
