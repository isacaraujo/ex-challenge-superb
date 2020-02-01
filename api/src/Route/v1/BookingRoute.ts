import { HttpRequestMethod } from '../../Core/Http/Type/HttpRequestMethod';
import { ICreateBookingController } from '../../Domain/Booking/Controller/ICreateBookingController';
import { Api } from './Api';

class BookingRoute extends Api {
  public async register(): Promise<void> {
    await this.registerCreateBookingRoute();
  }

  private async registerCreateBookingRoute(): Promise<void> {
    const controller = await this.getController(ICreateBookingController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.POST,
      path: '/bookings',
      version: BookingRoute.VERSION,
    });
  }
}

export { BookingRoute }
