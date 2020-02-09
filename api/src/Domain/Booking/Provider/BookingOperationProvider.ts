import { IContainerService } from '../../../Core/Container/IContainerService';
import { ILogger } from '../../../Core/Logger/ILogger';
import { IProvider } from '../../../Core/Provider/IProvider';
import { CancelBookingOperation } from '../Operation/CancelBookingOperation';
import { ConfirmBookingOperation } from '../Operation/ConfirmBookingOperation';
import { CreateBookingOperation } from '../Operation/CreateBookingOperation';
import { FindNextWaitingBookingOperation } from '../Operation/FindNextWaitingBookingOperation';
import { GetBookingDateTimeStatsOperation } from '../Operation/GetBookingDateTimeStatsOperation';
import { GetBookingOperation } from '../Operation/GetBookingOperation';
import { GetBookingStatsOperation } from '../Operation/GetBookingStatsOperation';
import { ICancelBookingOperation } from '../Operation/ICancelBookingOperation';
import { IConfirmBookingOperation } from '../Operation/IConfirmBookingOperation';
import { ICreateBookingOperation } from '../Operation/ICreateBookingOperation';
import { IFindNextWaitingBookingOperation } from '../Operation/IFindNextScheduledBookingOperation';
import { IGetBookingDateTimeStatsOperation } from '../Operation/IGetBookingDateTimeStatsOperation';
import { IGetBookingOperation } from '../Operation/IGetBookingOperation';
import { IGetBookingStatsOperation } from '../Operation/IGetBookingStatsOperation';
import { IListBookingOperation } from '../Operation/IListBookingOperation';
import { IUpdateBookingDateOperation } from '../Operation/IUpdateBookingDateOperation';
import { IUpdateBookingOperation } from '../Operation/IUpdateBookingOperation';
import { ListBookingOperation } from '../Operation/ListBookingOperation';
import { UpdateBookingDateOperation } from '../Operation/UpdateBookingDateOperation';
import { UpdateBookingOperation } from '../Operation/UpdateBookingOperation';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { IBookingStatsRepository } from '../Repository/IBookingStatsRepository';

class BookingOperationProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerCreateBookingOperation();
    this.registerListBookingOperation();
    this.registerGetBookingOperation();
    this.registerUpdateBookingOperation();
    this.registerGetBookingStatsOperation();
    this.registerGetBookingDateTimeStatsOperation();
    this.registerUpdateBookingDateOperation();
    this.registerCancelBookingOperation();
    this.registerFindNextWaitingBookingOperation();
    this.registerConfirmBookingOperation();
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

  private registerUpdateBookingOperation(): void {
    this.container.register(
      IUpdateBookingOperation,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new UpdateBookingOperation(repository, logger);
      });
  }

  private registerGetBookingStatsOperation(): void {
    this.container.register(
      IGetBookingStatsOperation,
      async () => {
        const repository = await this.container
          .get<IBookingStatsRepository>(IBookingStatsRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new GetBookingStatsOperation(repository, logger);
      });
  }

  private registerUpdateBookingDateOperation(): void {
    this.container.register(
      IUpdateBookingDateOperation,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new UpdateBookingDateOperation(repository, logger);
      });
  }

  private registerCancelBookingOperation(): void {
    this.container.register(
      ICancelBookingOperation,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new CancelBookingOperation(repository, logger);
      });
  }

  private registerGetBookingDateTimeStatsOperation(): void {
    this.container.register(
      IGetBookingDateTimeStatsOperation,
      async () => {
        const repository = await this.container
          .get<IBookingStatsRepository>(IBookingStatsRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new GetBookingDateTimeStatsOperation(repository, logger);
      });
  }

  private registerFindNextWaitingBookingOperation(): void {
    this.container.register(
      IFindNextWaitingBookingOperation,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new FindNextWaitingBookingOperation(repository, logger);
      });
  }

  private registerConfirmBookingOperation(): void {
    this.container.register(
      IConfirmBookingOperation,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        const logger = await this.container
          .get<ILogger>(ILogger);

        return new ConfirmBookingOperation(repository, logger);
      });
  }
}

export { BookingOperationProvider };
