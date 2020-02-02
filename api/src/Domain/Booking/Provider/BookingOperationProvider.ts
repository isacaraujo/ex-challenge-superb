import { IContainerService } from '../../../Core/Container/IContainerService';
import { ILogger } from '../../../Core/Logger/ILogger';
import { IProvider } from '../../../Core/Provider/IProvider';
import { GuestCreateBookingOperation } from '../Operation/GuestCreateBookingOperation';
import { IGuestCreateBookingOperation } from '../Operation/IGuestCreateBookingOperation';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { IBookingStatsRepository } from '../Repository/IBookingStatsRepository';
import { ICreateBookingOperation } from '../Operation/ICreateBookingOperation';
import { CreateBookingOperation } from '../Operation/CreateBookingOperation';

class BookingOperationProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerGuestCreateBookingOperation();
    this.registerCreateBookingOperation();
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
}

export { BookingOperationProvider };
