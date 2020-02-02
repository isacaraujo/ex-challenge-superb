import { HttpRequestMethod } from '../../Core/Http/Type/HttpRequestMethod';
import { ICreateBookingController } from '../../Domain/Booking/Controller/ICreateBookingController';
import {
    IGuestCreateBookingController
} from '../../Domain/Booking/Controller/IGuestCreateBookingController';
import { IListBookingController } from '../../Domain/Booking/Controller/IListBookingController';
import { Api } from './Api';

class BookingRoute extends Api {
  public async register(): Promise<void> {
    await this.registerGuestCreateBookingRoute();
    await this.registerCreateBookingRoute();
    await this.registerListBookingsRoute();
  }

  private async registerGuestCreateBookingRoute(): Promise<void> {
    const controller = await this.getController(IGuestCreateBookingController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.POST,
      path: '/bookings',
      version: BookingRoute.VERSION,
    });
  }

  private async registerCreateBookingRoute(): Promise<void> {
    const controller = await this.getController(ICreateBookingController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.POST,
      path: '/restaurants/current/bookings',
      version: BookingRoute.VERSION,
    });
  }

  private async registerListBookingsRoute(): Promise<void> {
    const controller = await this.getController(IListBookingController);

    this.addHttpRoute({
      controller,
      methods: HttpRequestMethod.GET,
      path: '/restaurants/current/bookings',
      version: BookingRoute.VERSION,
    });
  }
}

export { BookingRoute }
