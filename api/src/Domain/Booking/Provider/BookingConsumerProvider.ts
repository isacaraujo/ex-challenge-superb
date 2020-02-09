import { IProvider } from '../../../Core/Provider/IProvider';
import { IContainerService } from '../../../Core/Container/IContainerService';
import { INextPendingBookingConsumer } from '../Consumer/INextPendingBookingConsumer';
import { NextPendingBookingConsumer } from '../Consumer/NextPendingBookingConsumer';

class BookingConsumerProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}

  public register(): void {
    this.registerNextPendingBookingConsumer();
  }

  private registerNextPendingBookingConsumer(): void {
    this.container.register(
      INextPendingBookingConsumer,
      async () => {
        return Promise.resolve(new NextPendingBookingConsumer());
      }
    );
  }
}

export { BookingConsumerProvider };
