import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import { IBookingRepository } from '../Repository/IBookingRepository';
import { IBookingStatsRepository } from '../Repository/IBookingStatsRepository';
import { BookingCreator } from '../Service/BookingCreator';
import { BookingStatsFinder } from '../Service/BookingStatsFinder';
import { IBookingCreator } from '../Service/IBookingCreator';
import { IBookingStatsFinder } from '../Service/IBookingStatsFinder';

class BookingServiceProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerBookingCreator();
    this.registerBookingStatsFinder();
  }

  private registerBookingCreator(): void {
    this.container.register(
      IBookingCreator,
      async () => {
        const repository = await this.container
          .get<IBookingRepository>(IBookingRepository);

        return new BookingCreator(repository);
      }
    );
  }

  private registerBookingStatsFinder(): void {
    this.container.register(
      IBookingStatsFinder,
      async () => {
        const repository = await this.container
          .get<IBookingStatsRepository>(IBookingStatsRepository);

        return new BookingStatsFinder(repository);
      }
    );
  }
}

export { BookingServiceProvider };
