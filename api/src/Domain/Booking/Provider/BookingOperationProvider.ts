import { IContainerService } from '../../../Core/Container/IContainerService';
import { ILogger } from '../../../Core/Logger/ILogger';
import { IProvider } from '../../../Core/Provider/IProvider';
import { CreateBookingOperation } from '../Operation/CreateBookingOperation';
import { GetBookingOperation } from '../Operation/GetBookingOperation';
import { GuestCreateBookingOperation } from '../Operation/GuestCreateBookingOperation';
import { ICreateBookingOperation } from '../Operation/ICreateBookingOperation';
import { IGetBookingOperation } from '../Operation/IGetBookingOperation';
import { IGuestCreateBookingOperation } from '../Operation/IGuestCreateBookingOperation';
import { IListBookingOperation } from '../Operation/IListBookingOperation';
import { ListBookingOperation } from '../Operation/ListBookingOperation';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { IBookingStatsRepository } from '../Repository/IBookingStatsRepository';

class BookingOperationProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerGuestCreateBookingOperation();
    this.registerCreateBookingOperation();
    this.registerListBookingOperation();
    this.registerGetBookingOperation();
  }

  private registerGuestCreateBookingOperation(): void {
    this.container.register(
      IGuestCreateBookingOperation,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        const statsRepository = await this.container
          .get<IBookingStatsRepository>(IBookingStatsRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new GuestCreateBookingOperation(repository, statsRepository, logger);
      });
  }

  private registerCreateBookingOperation(): void {
    this.container.register(
      ICreateBookingOperation,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        const statsRepository = await this.container
          .get<IBookingStatsRepository>(IBookingStatsRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new CreateBookingOperation(repository, statsRepository, logger);
      });
  }

  private registerListBookingOperation(): void {
    this.container.register(
      IListBookingOperation,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new ListBookingOperation(repository, logger);
      });
  }

  private registerGetBookingOperation(): void {
    this.container.register(
      IGetBookingOperation,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new GetBookingOperation(repository, logger);
      });
  }
}

export { BookingOperationProvider };
