import { IContainerService } from '../../../Core/Container/IContainerService';
import { IProvider } from '../../../Core/Provider/IProvider';
import { INextPendingBookingQueue } from '../Queue/INextPendingBookingQueue';
import { INextPendingBookingNotifierService } from '../Service/INextPendingBookingNotifierService';
import { NextPendingBookingNotifierService } from '../Service/NextPendingBookingNotifierService';

class BookingServiceProvider implements IProvider {
  public constructor(private readonly container: IContainerService) {}
  
  public register(): void {
    this.registerNextPendingBookingNotifierService();
  }

  private registerNextPendingBookingNotifierService(): void {
    this.container.register<INextPendingBookingNotifierService>(
      INextPendingBookingNotifierService,
      async () => {
        const queue = await this.container
          .get<INextPendingBookingQueue>(INextPendingBookingQueue);

        return new NextPendingBookingNotifierService(queue);
      });
  }
}

export { BookingServiceProvider };
