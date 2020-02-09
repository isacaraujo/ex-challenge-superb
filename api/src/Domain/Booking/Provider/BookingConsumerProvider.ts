import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import {
    IFindCurrentRestaurantOperation
} from '../../Restaurant/Operation/IFindCurrentRestaurantOperation';
import { INextPendingBookingConsumer } from '../Consumer/INextPendingBookingConsumer';
import { NextPendingBookingConsumer } from '../Consumer/NextPendingBookingConsumer';
import { IFindNextWaitingBookingOperation } from '../Operation/IFindNextScheduledBookingOperation';
import { IGetBookingDateTimeStatsOperation } from '../Operation/IGetBookingDateTimeStatsOperation';

class BookingConsumerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerNextPendingBookingConsumer();
  }

  private registerNextPendingBookingConsumer(): void {
    this.container.register(
      INextPendingBookingConsumer,
      async () => {
        const findRestaurant = await this.container
          .get<IFindCurrentRestaurantOperation>(IFindCurrentRestaurantOperation);

        const getStats = await this.container
          .get<IGetBookingDateTimeStatsOperation>(IGetBookingDateTimeStatsOperation);

        const findNextWaitingBooking = await this.container
          .get<IFindNextWaitingBookingOperation>(IFindNextWaitingBookingOperation);

        return new NextPendingBookingConsumer(
          findRestaurant,
          getStats,
          findNextWaitingBooking
        );
      });
  }
}

export { BookingConsumerProvider };
