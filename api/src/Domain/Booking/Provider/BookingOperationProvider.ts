import { IContainerService } from '../../../Core/Container/IContainerService';
import { ILogger } from '../../../Core/Logger/ILogger';
import { IProvider } from '../../../Core/Provider/IProvider';
import { CreateBookingOperation } from '../Operation/CreateBookingOperation';
import { ICreateBookingOperation } from '../Operation/ICreateBookingOperation';
import { IBookingRepository } from '../Repository/IBookingRepository';

class BookingOperationProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerCreateBookingOperation();
  }

  private registerCreateBookingOperation(): void {
    this.container.register(
      ICreateBookingOperation,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new CreateBookingOperation(repository, logger);
      }
    )
  }
}

export { BookingOperationProvider };
