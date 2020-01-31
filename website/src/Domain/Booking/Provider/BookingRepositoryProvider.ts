import { IContainerService } from '../../../Core/Container/IContainerService';
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
        return new BookingRepository();
      }
    );
  }

  private registerBookingStatsRepository(): void {
    this.container.register(
      IBookingStatsRepository,
      async () => {
        return new BookingStatsRepository();
      }
    );
  }
}

export { BookingRepositoryProvider };
